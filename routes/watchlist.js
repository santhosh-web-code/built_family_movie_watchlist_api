import express from "express";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie
} from "../utils/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

router.get("/:userId", authenticate, (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(watchlist);
});

router.post(
  "/:userId/movies",
  authenticate,
  authorizeModification,
  (req, res) => {
    const movie = addMovie(Number(req.params.userId), req.body);

    if (!movie) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(201).json(movie);
  }
);

router.put(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const movie = updateMovie(
      Number(req.params.userId),
      Number(req.params.movieId),
      req.body
    );

    if (!movie) {
      return res.status(404).json({ error: "Movie or user not found" });
    }

    return res.status(200).json(movie);
  }
);

router.delete(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const deleted = deleteMovie(
      Number(req.params.userId),
      Number(req.params.movieId)
    );

    if (!deleted) {
      return res.status(404).json({ error: "Movie or user not found" });
    }

    return res.status(200).json({ message: "Movie deleted successfully" });
  }
);

export default router;
