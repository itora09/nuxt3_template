export default defineEventHandler((event) => {
  // throw createError({
  //   statusCode: 404,
  //   statusMessage: "Not Found",
  // });
  return {
    hoge: "hoge",
    fuga: 111,
    piyo: true,
  };
});
