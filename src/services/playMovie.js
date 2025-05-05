import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
// Chức năng kiểm tra xem người dùng có đủ điều kiện truy cập nội dung dựa trên cấp độ VIP hay không
export const checkVipEligibility = async (userId, plans, movie) => {
  try {
    // Fetch user's active subscription plans
    const userPlans = await getPlansByUser(userId, plans);
    if (userPlans == 0) {
      console.log("User does not have an active VIP subscription.");
      return false; // No active VIP plan
    }
    const movieLevel = plans.find(plan => plan.id === movie.planID).level;
    const status = userPlans >= movieLevel ? true : false;
    return status; // Trả về trạng thái eligibility
  } catch (error) {
    console.error("Error checking VIP eligibility:", error);
    return false; // Return false in case of error
  }
};

export const getPlansByUser = async (idUser, plans) => {
  try {
    // Tạo truy vấn để lấy dữ liệu của người dùng dựa trên idUser
    const vipQuery = query(collection(db, "Subscriptions"), where("accountId", "==", idUser));
    const querySnapshot = await getDocs(vipQuery);
    // Lưu trữ thông tin VIP hợp lệ (chưa hết hạn)
    const vipData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const currentDate = new Date();
      const expiryDate = data.expiryDate ? data.expiryDate.toDate() : null;

      // Chỉ lấy các gói VIP chưa hết hạn
      if (expiryDate && expiryDate > currentDate) {
        vipData.push({
          id: doc.id,
          ...data,
        });
      }
    });
    console.log(vipData);

    // Duyệt qua các plan và tìm VIP có level cao nhất dựa vào vipData
    const highestVipLevels = vipData.map(vip => {
      const planForVip = plans.find(plan => plan.id === vip.id_plan);
      return planForVip ? planForVip.level : null; // Không tìm thấy kế hoạch tương ứng
    });
    console.log(highestVipLevels);

    // Tìm cấp độ cao nhất từ các cấp độ VIP đã lấy
    const maxVipLevel = highestVipLevels.reduce((highest, current) => {
      return current > highest ? current : highest;
    }, 0); // Bắt đầu với level thấp nhất là 0

    return maxVipLevel;
  } catch (error) {
    console.error("Error fetching VIP plans:", error);
    return null; // Trả về null nếu có lỗi
  }
};

export const handleClick = async (movie, isLoggedIn, plans, navigate) => {
  if (!isLoggedIn) {
      alert("Vui long dang nhap");
    return;
  }
  const status = await checkVipEligibility(isLoggedIn.id, plans, movie);
  if (status) {
    navigate(`/detail/${movie.id}`);
    return;
  }
  const checkRentMovie = await checkIfMovieRented(isLoggedIn.id, movie.id);
  if (checkRentMovie) {
    navigate(`/detail/${movie.id}`);
    return;
  }
  const plan = plans.find(p => p.id === movie.planID);

  if (plan.level > 2) {
    navigate(`/rentmovie/${movie.id}`);
  } else {
    navigate(`/plan`);
  }
};

export async function checkIfMovieRented(userEmail, movieId) {
  try {
    // Tạo query để tìm kiếm trong bộ sưu tập `RentMovies`
    const rentalsRef = collection(db, "RentMovies");
    const q = query(rentalsRef,
      where("accountId", "==", userEmail),
      where("movieId", "==", movieId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Lấy tài liệu đầu tiên (nếu có nhiều giao dịch thuê cho cùng một phim, tùy yêu cầu, có thể thay đổi logic này)
      const rentalData = querySnapshot.docs[0].data();
      const expiryDate = rentalData.expiryDate;

      // Kiểm tra xem expiryDate có còn hiệu lực không
      if (expiryDate && expiryDate.toDate() > new Date()) {
        return true;  // Đã thuê và còn trong thời hạn
      } else {
        return false; // Đã thuê nhưng hết hạn
      }
    } else {
      return false; // Chưa thuê
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra bộ phim đã thuê:", error);
    return false;
  }
}

export async function getSubscriptionsByMonthAndYear(month, year) {
  try {
    // Tạo khoảng thời gian bắt đầu và kết thúc
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
    const endDate = new Date(year, month, 1); // Ngày đầu tiên của tháng tiếp theo

    // Thực hiện truy vấn
    const rentalsRef = collection(db, "Subscriptions");
    const q = query(
      rentalsRef,
      where("startDate", ">=", startDate),
      where("startDate", "<", endDate)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Không có dữ liệu nào phù hợp.");
      return [];
    }

    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });

    return results; // Trả về danh sách tài liệu
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    return []; // Trả về mảng rỗng trong trường hợp có lỗi
  }
}