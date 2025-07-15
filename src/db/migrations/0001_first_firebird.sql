CREATE TABLE "audio_-chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid NOT NULL,
	"transcription" text NOT NULL,
	"embeddings" vector(768) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "audio-chunks" CASCADE;--> statement-breakpoint
ALTER TABLE "audio_-chunks" ADD CONSTRAINT "audio_-chunks_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;