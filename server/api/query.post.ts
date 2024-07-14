export default defineEventHandler(async (event) => {
    const query = await readBody(event);
    console.log(query);
    return {
        ...query,
        asdasd: 123
    };
});
