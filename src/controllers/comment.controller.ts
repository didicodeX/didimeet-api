import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { CommentRepository } from "../repositories/comment.repository";

export class CommentController {
  private commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  // ➤ Créer un commentaire
  async createComment(req: Request, res: Response) {
    try {
      const newComment = await this.commentService.createComment(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la création du commentaire" });
    }
  }

  // ➤ Récupérer tous les commentaires
  async getAllComments(req: Request, res: Response) {
    try {
      const comments = await this.commentService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des commentaires" });
    }
  }

  // ➤ Récupérer un commentaire par ID
  async getCommentById(req: Request, res: Response) {
    try {
      const comment = await this.commentService.getCommentById(req.params.id);
      if (!comment) {
        res.status(404).json({ error: "Commentaire non trouvé" });
        return;
      }
      res.status(200).json(comment);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du commentaire" });
    }
  }

  // ➤ Récupérer les commentaires d'un événement
  async getCommentsByEvent(req: Request, res: Response) {
    try {
      const comments = await this.commentService.getCommentsByEvent(
        req.params.eventId
      );
      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des commentaires" });
    }
  }

  // ➤ Mettre à jour un commentaire
  async updateComment(req: Request, res: Response) {
    try {
      const updatedComment = await this.commentService.updateComment(
        req.params.id,
        req.body
      );
      if (!updatedComment) {
        res.status(404).json({ error: "Commentaire non trouvé" });
        return;
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour du commentaire" });
    }
  }

  // ➤ Supprimer un commentaire
  async deleteComment(req: Request, res: Response) {
    try {
      const deletedComment = await this.commentService.deleteComment(
        req.params.id
      );
      if (!deletedComment) {
        res.status(404).json({ error: "Commentaire non trouvé" });
        return;
      }
      res.status(200).json({ message: "Commentaire supprimé avec succès" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du commentaire" });
    }
  }
}
