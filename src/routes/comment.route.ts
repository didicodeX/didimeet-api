import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { CommentService } from "../services/comment.service";
import { CommentRepository } from "../repositories/comment.repository";

const router = Router();

// 🔹 Instancier les classes avec leurs dépendances
const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

// 🔹 Définition des routes
router.post("/", commentController.createComment.bind(commentController)); // Créer un commentaire
router.get("/", commentController.getAllComments.bind(commentController)); // Récupérer tous les commentaires
router.get("/:id", commentController.getCommentById.bind(commentController)); // Récupérer un commentaire par ID
router.get("/event/:eventId", commentController.getCommentsByEvent.bind(commentController)); // Récupérer les commentaires d'un événement
router.put("/:id", commentController.updateComment.bind(commentController)); // Mettre à jour un commentaire
router.delete("/:id", commentController.deleteComment.bind(commentController)); // Supprimer un commentaire

export default router;
