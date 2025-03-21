import { GoFileMedia } from "react-icons/go";
import { RiVipDiamondFill } from "react-icons/ri";
import { GiEngagementRing } from "react-icons/gi";
import { FaChromecast } from "react-icons/fa";
import logoImg  from "../assets/images/logo.png";


export const menus = [
    {
        id: 1,
        title: "Media Management",
        icon: <GoFileMedia />,
        items: [
            {
                id: 1,
                title: "Movies",
                path: "/movies"
            },
            {
                id: 2,
                title: "Episode",
                path: "/Episode"
            },
            {
                id: 3,
                title: "Trailer",
                path: "/Trailer"
            }
        ]
    },
    {
        id: 2,
        title: "Vip",
        icon: <RiVipDiamondFill />,
        items: [
            {
                id: 1,
                title: "Package",
                path: "/Package"
            },
            {
                id: 2,
                title: "Feature",
                path: "/Feature"
            },
            {
                id: 3,
                title: "Plans",
                path: "/Plans"
            }
        ]
    },
    {
        id: 3,
        title: "Engagement Pages",
        icon: <GiEngagementRing />,
        items: [
            {
                id: 1,
                title: "Like ",
                path: "/Like"
            },
            {
                id: 2,
                title: "Watchlist ",
                path: "/Watchlist  "
            },
            {
                id: 3,
                title: "Comment",
                path: "/Comment "
            }
        ]
    },
    {
        id: 4,
        title: "Cast & Crew",
        icon: <FaChromecast />,
        items: [
            {
                id: 1,
                title: "Author",
                path: "/Author"
            },
            {
                id: 2,
                title: "Character",
                path: "/Character"
            },
            {
                id: 3,
                title: "Actor",
                path: "/Actor"
            }
        ]
    }
];

export const linkMenu = [
    {
        path : "/",
        title : "Home"
    },
    {
        path : "khophim",
        title : "Movie Store"
    },
     {
       path: "/rent",
       title: "Movie Rental"
    }
];

// Constants for roles
export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
    USER: 'user',          // Người dùng thông thường
};
export const  SECRET_KEY = "0337560890" ;
export const logo  = logoImg ;
export const cloudName = "dhmccpqj5";
export const upload_preset = "cinehome" ;
