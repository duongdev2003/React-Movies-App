import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
    {
        display: "home",
        // display: "Trang chủ",
        path: "/",
        icon: <HomeOutlinedIcon />,
        state: "home",
    },
    {
        display: "movies",
        // display: "Phim",
        path: "/movie",
        icon: <SlideshowOutlinedIcon />,
        state: "movie",
    },
    {
        display: "tv series",
        // display: "Phim truyền hình dài tập",
        path: "/tv",
        icon: <LiveTvOutlinedIcon />,
        state: "tv",
    },
    {
        display: "search",
        // display: "Tìm kiếm",
        path: "/search",
        icon: <SearchOutlinedIcon />,
        state: "search",
    },
];

const user = [
    {
        display: "favorites",
        path: "/favorites",
        icon: <FavoriteBorderOutlinedIcon />,
        state: "favorite",
    },
    {
        display: "reviews",
        path: "/reviews",
        icon: <RateReviewOutlinedIcon />,
        state: "reviews",
    },
    {
        display: "password update",
        path: "/password-update",
        icon: <LockResetOutlinedIcon />,
        state: "password.update",
    },
];

const menuConfigs = { main, user };

export default menuConfigs;