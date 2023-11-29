import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
    "/signup",
    body("username")
        .exists()
        .withMessage("Tên người dùng là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Tên người dùng tối thiểu là 8 ký tự")
        .custom(async (value) => {
            const user = await userModel.findOne({ username: value });
            if (user) return Promise.reject("Tên người dùng đã được sử dụng");
        }),
    body("password")
        .exists()
        .withMessage("Mật khẩu là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Mật khẩu tối thiểu là 8 ký tự"),
    body("confirmPassword")
        .exists()
        .withMessage("Xác nhận mật khẩu mới là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Xác nhận mật khẩu mới tối thiểu là 8 ký tự")
        .custom((value, { req }) => {
            if (value !== req.body.password)
                throw new Error("Mật khẩu không khớp");
            return true;
        }),
    body("displayName")
        .exists()
        .withMessage("Tên hiển thị là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Tên hiển thị tối thiểu là 8 ký tự"),
    requestHandler.validate,
    userController.signup
);

router.post(
    "/signin",
    body("username")
        .exists()
        .withMessage("Tên người dùng là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Tên người dùng tối thiểu là 8 ký tự"),
    body("password")
        .exists()
        .withMessage("Mật khẩu là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Mật khẩu tối thiểu là 8 ký tự"),
    requestHandler.validate,
    userController.signin
);

router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
        .exists()
        .withMessage("Mật khẩu là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Mật khẩu tối thiểu là 8 ký tự"),
    body("newPassword")
        .exists()
        .withMessage("Mật khẩu mới là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Mật khẩu tối thiểu là 8 ký tự"),
    body("confirmNewPassword")
        .exists()
        .withMessage("Xác nhận mật khẩu mới là bắt buộc")
        .isLength({ min: 8 })
        .withMessage("Xác nhận mật khẩu mới tối thiểu là 8 ký tự")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword)
                throw new Error("Mật khẩu không khớp");
            return true;
        }),
    requestHandler.validate,
    userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
    "/favorites",
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
);

router.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediaType")
        .exists()
        .withMessage("mediaType là bắt buộc")
        .custom((type) => ["movie", "tv"].includes(type))
        .withMessage("mediaType không hợp lệ"),
    body("mediaId")
        .exists()
        .withMessage("mediaId là bắt buộc")
        .isLength({ min: 1 })
        .withMessage("mediaId không được để trống"),
    body("mediaTitle").exists().withMessage("mediaTitle là bắt buộc"),
    body("mediaPoster").exists().withMessage("mediaPoster là bắt buộc"),
    body("mediaRate").exists().withMessage("mediaRate là bắt buộc"),
    requestHandler.validate,
    favoriteController.addFavorite
);

router.delete(
    "/favorites/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
);

export default router;
