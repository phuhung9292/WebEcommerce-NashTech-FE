import axios from "axios";
import authHeader from "./AuthHeader";

const RATING_API_BASE_URL = "http://localhost:8080/api/v1/rating";

class RatingService {
  userRating(comment, ratingValue, orderedProductId) {
    return axios.post(
      RATING_API_BASE_URL,
      { comment, ratingValue, orderedProductId },
      {
        headers: authHeader(),
      }
    );
  }
  getAllRating(productId) {
    return axios.get(RATING_API_BASE_URL + `/${productId}`);
  }
}
export default new RatingService();
