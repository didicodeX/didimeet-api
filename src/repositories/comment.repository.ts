import { CommentModel } from "../models/comment.model";
import { CommentInterface } from "../interfaces/comment.interface";
import { populate } from "dotenv";

export class CommentRepository {
  // 🔹 Créer un commentaire
  async create(data: CommentInterface) {
    return await CommentModel.create(data);
  }

  // 🔹 Récupérer tous les commentaires
  async findAll() {
    return await CommentModel.find().select("-__v -createdAt -updatedAt ")
      .populate("user", "name email")
      .populate({
        path: "event",
        select: "title", // ⚡ Récupérer uniquement le nom de l'événement et son organisateur
        populate: {
          path: "organizer",
          select: "name", // ⚡ Récupérer uniquement le nom et l'ID de l'organisateur
        },
      });
  }

  // 🔹 Récupérer un commentaire par ID
  async findById(commentId: string) {
    return await CommentModel.findById(commentId)
      .populate("user")
      .populate("event");
  }

  // 🔹 Récupérer les commentaires d'un événement
  async findByEvent(eventId: string) {
    return await CommentModel.find({ event: eventId }).populate("user");
  }

  // 🔹 Mettre à jour un commentaire
  async update(commentId: string, newData: Partial<CommentInterface>) {
    return await CommentModel.findByIdAndUpdate(commentId, newData, {
      new: true,
    });
  }

  // 🔹 Supprimer un commentaire
  async delete(commentId: string) {
    return await CommentModel.findByIdAndDelete(commentId);
  }
}
