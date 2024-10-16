async function registerRoute(req, res, next) {
  const date = new Date();
  const route_type = "SYSTEM";
  console.log(
    `${date.toLocaleDateString()}:${date.toLocaleTimeString()}||${route_type}-ROUTE[${
      req.method
    }]: ${req.path} `
  );
  next();
}
module.exports = registerRoute;
