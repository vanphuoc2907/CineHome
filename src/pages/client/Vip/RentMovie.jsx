import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { filterById, getObjectById } from "../../../utils/FunctionContants";
import { ContextMovies } from "../../../context/MovieProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import { BsCheck2 } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { ContextFeatures } from "../../../context/FeatureProvider";

export default function RentMovie() {
    const { id } = useParams();
    const features = useContext(ContextFeatures);
    const plans = useContext(ContextPlans);
    const movies = useContext(ContextMovies);
    const [planShow, setPlanShow] = useState([]);
    const [movieRent, setMovieRent] = useState({});
    const [selectedPlan, setSelectedPlan] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const movie = getObjectById(id, movies);
        setMovieRent(movie);
        const filterPlan = plans.filter(p => p.level >= getObjectById(movie.planID, plans).level);
        setPlanShow(filterPlan);
    }, [id, movies]);

    const handleRentMovie = () => {
       if(selectedPlan == id) {
         navigate(`/paymentrent/${id}`);
       }else {
        navigate(`/plan`);
       }
    }
    return (
        <div className="p-20">
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-semibold text-center">Phương thức thanh toán</h2>

                {/* Phim đang thuê */}
                <div onClick={() => setSelectedPlan(id)} className={`mt-4 p-4 border rounded-md cursor-pointer ${selectedPlan === id ? "border-blue-500 bg-blue-50" : ""}`}>
                    <p className="text-blue-500 text-sm text-center">Bạn đang chọn thuê</p>
                    <p className="font-semibold text-center">{movieRent?.name}</p>
                    <p className="text-center font-bold text-lg">{parseInt(movieRent?.rentalPrice).toLocaleString('vi-VN')} <sup>đ</sup></p>
                </div>

                {/* Tiết kiệm hơn với Combo */}
                <p className="text-blue-500 text-sm text-center mt-4">Tiết kiệm hơn với Combo</p>

                {planShow.map((plan) => (
                    <div
                        key={plan.name}
                        className={`mt-4 p-4 border rounded-md cursor-pointer ${selectedPlan === plan.id ? "border-blue-500 bg-blue-50" : ""}`}
                        onClick={() => setSelectedPlan(plan.id)}
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{plan.title}</p>
                            <p className="font-bold text-lg">{parseInt(plan.pricePerMonth).toLocaleString('vi-VN')} <sup>đ</sup></p>
                        </div>
                        {
                            filterById(features, plan.id, "planId").map((element, index) => (
                                <li key={index} className='flex gap-2 items-center '>{element.text}</li>
                            ))
                        }
                        <p className="text-blue-500 text-sm font-semibold mt-2">Lựa chọn tốt nhất</p>
                    </div>
                ))}

                {/* Nút tiếp tục */}
                {selectedPlan && <button onClick={handleRentMovie} className="w-full bg-blue-500 text-white py-2 rounded-md mt-6 hover:bg-blue-600 transition"> Tiếp tục </button>}
                {/* Xem kho phim */}
                <p className="text-center text-blue-500 text-sm mt-4 cursor-pointer">Xem kho phim và thanh toán sau</p>
            </div>
        </div>

    );
}