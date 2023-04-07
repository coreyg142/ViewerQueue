import express from "express";
import historyApiFallback from "connect-history-api-fallback";
const app = express();
const staticFileMiddleware = express.static("dist");
app.use(staticFileMiddleware);
app.use(historyApiFallback({ index: "/" }));
app.use(staticFileMiddleware);
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
//# sourceMappingURL=express.js.map