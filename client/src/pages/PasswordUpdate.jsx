import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { useState } from "react";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";

const PasswordUpdate = () => {
    const [onRequest, setOnRequest] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Mật khẩu tối thiểu 8 ký tự")
                .required("Mật khẩu tối thiểu 8 ký tự"),
            newPassword: Yup.string()
                .min(8, "Mật khẩu mới tối thiểu 8 ký tự")
                .required("Mật khẩu mới tối thiểu 8 ký tự"),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "confirmNewPassword not match")
                .min(8, "Xác nhận mật khẩu mới tối thiểu 8 ký tự")
                .required("Xác nhận mật khẩu mới tối thiểu 8 ký tự"),
        }),
        onSubmit: async (values) => onUpdate(values),
    });

    const onUpdate = async (values) => {
        if (onRequest) return;
        setOnRequest(true);

        const { response, err } = await userApi.passwordUpdate(values);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            form.resetForm();
            navigate("/");
            dispatch(setUser(null));
            dispatch(setAuthModalOpen(true));
            toast.success("Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        }
    };

    return (
        <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Container header="update password">
                <Box
                    component="form"
                    maxWidth="400px"
                    onSubmit={form.handleSubmit}
                >
                    <Stack spacing={2}>
                        <TextField
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            fullWidth
                            value={form.values.password}
                            onChange={form.handleChange}
                            color="success"
                            error={
                                form.touched.password &&
                                form.errors.password !== undefined
                            }
                            helperText={
                                form.touched.password && form.errors.password
                            }
                        />
                        <TextField
                            type="password"
                            placeholder="Mật khẩu mới"
                            name="newPassword"
                            fullWidth
                            value={form.values.newPassword}
                            onChange={form.handleChange}
                            color="success"
                            error={
                                form.touched.newPassword &&
                                form.errors.newPassword !== undefined
                            }
                            helperText={
                                form.touched.newPassword &&
                                form.errors.newPassword
                            }
                        />
                        <TextField
                            type="password"
                            placeholder="Xác nhận mật khẩu mới"
                            name="confirmNewPassword"
                            fullWidth
                            value={form.values.confirmNewPassword}
                            onChange={form.handleChange}
                            color="success"
                            error={
                                form.touched.confirmNewPassword &&
                                form.errors.confirmNewPassword !== undefined
                            }
                            helperText={
                                form.touched.confirmNewPassword &&
                                form.errors.confirmNewPassword
                            }
                        />

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ marginTop: 4 }}
                            loading={onRequest}
                        >
                            Thay đổi mật khẩu
                        </LoadingButton>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default PasswordUpdate;
