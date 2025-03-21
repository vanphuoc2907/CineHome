import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { uploadImageToCloudinary } from "../config/cloudinaryConfig";
export const fetchDocumentsRealtime = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  // Lắng nghe dữ liệu thay đổi trong thời gian thực
  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    // Gọi callback với dữ liệu mới nhất
    callback(documents);
  });

  // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
  return unsubscribe;
};

// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values) => {
    try {
      if (values.imgUrl) {
        const imgUrl = await uploadImageToCloudinary(values.imgUrl,collectionName);
        values.imgUrl = imgUrl;
      }
      const docRef = await addDoc(collection(db, collectionName), values);
       // Trả về đối tượng có ID của tài liệu
      return { id: docRef.id, ...values };
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  };

export const deleteDocument = async (collectionName, docId, imgUrl) => {
    // Xóa ảnh trên Cloudinary nếu tồn tại
    // if (imgUrl && imgUrl.includes('cloudinary.com')) {
    //   // Lấy `public_id` từ URL của Cloudinary
    //   const publicId = imgUrl
    //     .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
    //     .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
    //   await deleteImageFromCloudinary(publicId);
    // }
  // Xóa tài liệu khỏi Firestore
  await deleteDoc(doc(collection(db, collectionName), docId));
};

// Update a document in a given collection with an optional image upload
export const updateDocument = async (collectionName, values, imgUpload, oldImgUrl) => {
  // if (imgUpload) {
  //   const imgUrl = await uploadImageToCloudinary(imgUpload,collectionName);
  //   values.imgUrl = imgUrl;

  //   // Xóa ảnh trên Cloudinary nếu tồn tại
  //   if (oldImgUrl && oldImgUrl.includes('cloudinary.com')) {
  //     // Lấy `public_id` từ URL của Cloudinary
  //     const publicId = oldImgUrl
  //       .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
  //       .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
  //     await deleteImageFromCloudinary(publicId);
  //   }
  // }
  await updateDoc(doc(collection(db, collectionName), values.id), values);
};
