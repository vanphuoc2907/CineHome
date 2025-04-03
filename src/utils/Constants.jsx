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
                path: "/episode"
            },
            {
                id: 3,
                title: "Trailer",
                path: "/trailer"
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
                path: "/package"
            },
            {
                id: 2,
                title: "Feature",
                path: "/feature"
            },
            {
                id: 3,
                title: "Plans",
                path: "/plans"
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
                path: "/like"
            },
            {
                id: 2,
                title: "Watchlist ",
                path: "/watchlist  "
            },
            {
                id: 3,
                title: "Comment",
                path: "/comment "
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
                path: "/author"
            },
            {
                id: 2,
                title: "Character",
                path: "/character"
            },
            {
                id: 3,
                title: "Actor",
                path: "/actor"
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

export const initialOptions = {
    "client-id": "Ad_rS4a2dLwZ-V7_NRfwQ7dvuZG0pq6cSBm71cjRVP3XAuiR5VtmgNmS8hja5RriCQ1YVWLmAKRQAzZu",
    currency: "USD",
    intent: "capture"
  };