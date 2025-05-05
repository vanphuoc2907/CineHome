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
    },
    {
        path: "/promotions",
        title: "Promotions"
    },
    {
        path: "/contacts",
        title: "Contacts"
    },

];

export const PAY_MENT = [
    {
        id : 1,
        img : "https://rgb.vn/wp-content/uploads/2014/05/rgb_vn_new_branding_paypal_2014_logo_detail.png",
        name : "Thẻ tín dụng"
    },
    {
        id : 2,
        img : "https://cdn.worldvectorlogo.com/logos/momo-2.svg",
        name : "Ví MoMo"
    },
    {
        id : 3,
        img : "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png",
        name : "Ví Zalopay"
    },
    {
        id : 4,
        img : "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ShopeePay-V.png",
        name : "Ví ShopeePay"
    },
    {
        id : 5,
        img : "https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg",
        name : "VNPAY"
    },


]
export  const faqs = [
        {
            title: "PAYMENT METHOD",
            questions: [
                "Does Beta Movie have a scratch card payment service?",
                "What payment methods are currently available on Beta Movie?",
                "Once I have registered for the GV119 package, will I be charged when watching Beta Movie via 3G/4G?",
                "Will the GV119 package automatically renew?",
            ],
        },
        {
            title: "BETA MOVIE INFORMATION",
            questions: [
                "What is Beta Movie?",
                "What are the product categories of Beta Movie?",
                "What devices can Beta Movie be viewed on?",
                "What is a Movie Rental?",
                "What is a Movie Package?",
            ],
        },
        {
            title: "OTHER FREQUENTLY ASKED QUESTIONS",
            questions: [
                "How many devices can I log in and watch on with a Beta account?",
                "Is there a limit to the number of movies I can download?",
                "Can I download the movie after renting it in the Premium Movies section?",
                "Can I watch movies that have been downloaded for a certain amount of time?",
            ],
        },
        {
            title: "SERVICE PACKAGES AT BETA MOVIE",
            questions: [
                "What is a VIP package?",
                "How can I register for a VIP package?",
                "Can the SVIP package be used with other MobiFone data packages?",
                "I have registered for the SVIP package, can my account be used on other devices?",
                "What is a VVIP package?",
            ],
        },
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

  export const COLORS = [
    '#0088FE', // Blue
    '#00C49F', // Teal
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#A28FFB', // Lavender
    '#F765A3', // Pink
    '#FF6B6B', // Coral
    '#4CAF50', // Green
    '#FFD700', // Gold
    '#8A2BE2', // BlueViolet
    '#FF4500', // OrangeRed
    '#20B2AA'  // LightSeaGreen
  ];
  
export const YOUR_SERVICE_ID = "service_a67e2p9";
export const YOUR_TEMPLATE_ID = "template_8gq28ak";
export const YOUR_USER_ID = "tPBoFr0iy0T6ACLJU";
export const CONFIRM_CODE = "template_c4qydeh";
export const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  