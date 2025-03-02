import { CommentRepository } from "../repositories/comment.repository";
import { CommentInterface } from "../interfaces/comment.interface";

export class CommentService {
  private repository: CommentRepository;

  constructor(repository: CommentRepository) {
    this.repository = repository;
  }

  // 🔹 Créer un commentaire
  async createComment(data: CommentInterface) {
    return await this.repository.create(data);
  }

  // 🔹 Récupérer tous les commentaires
  async getAllComments() {
    return await this.repository.findAll();
  }

  // 🔹 Récupérer un commentaire par ID
  async getCommentById(commentId: string) {
    return await this.repository.findById(commentId);
  }

  // 🔹 Récupérer les commentaires d'un événement
  async getCommentsByEvent(eventId: string) {
    return await this.repository.findByEvent(eventId);
  }

  // 🔹 Mettre à jour un commentaire
  async updateComment(commentId: string, newData: Partial<CommentInterface>) {
    return await this.repository.update(commentId, newData);
  }

  // 🔹 Supprimer un commentaire
  async deleteComment(commentId: string) {
    return await this.repository.delete(commentId);
  }
}
