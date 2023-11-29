import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  tokenMiddleware.auth,
  reviewController.getReviewsOfUser
);

router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists().withMessage("mediaId là bắt buộc")
    .isLength({ min: 1 }).withMessage("mediaId không được để trống"),
  body("content")
    .exists().withMessage("content là bắt buộc")
    .isLength({ min: 1 }).withMessage("content không được để trống"),
  body("mediaType")
    .exists().withMessage("mediaType là bắt buộc")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType không hợp lệ"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle là bắt buộc"),
  body("mediaPoster")
    .exists().withMessage("mediaPoster là bắt buộc"),
  requestHandler.validate,
  reviewController.create
);

router.delete(
  "/:reviewId",
  tokenMiddleware.auth,
  reviewController.remove
);

export default router;