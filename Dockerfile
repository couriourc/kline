FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install  --frozen-lockfile


FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


RUN pnpm run build

FROM base

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/

COPY docker/ ./
RUN pnpm i

# S ENV
ENV NUXT_PUBLIC_API_SECRET NUXT_PUBLIC_API_SECRET
ENV NUXT_PUBLIC_API_BASE NUXT_PUBLIC_API_BASE
# E ENV
# S PORT
EXPOSE 3000
# E PORT

ENTRYPOINT ["pnpm","start"]
