import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

type Note = {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NoteKeeper';

  public notes: Note[] = [];
  public noteTitle: string = '';
  public noteContent: string = '';
  public editMode: boolean = false;
  public editedNoteId: string = '';

  @ViewChild('noteForm') noteForm!: NgForm;

  public saveNote() {
    if (this.editMode) {
      const editedNoteIndex = this.notes.findIndex(
        (note) => note.id === this.editedNoteId
      );
      this.notes[editedNoteIndex].title = this.noteTitle;
      this.notes[editedNoteIndex].content = this.noteContent;
      this.notes[editedNoteIndex].isActive = false;
      this.editMode = false;
      this.editedNoteId = '';
    } else {
      this.notes.push({
        id: crypto.randomUUID(),
        title: this.noteTitle,
        content: this.noteContent,
        isActive: false,
      });
    }
    this.noteForm.reset();
    this.resetTempData();
  }

  private resetTempData() {
    this.noteTitle = '';
    this.noteContent = '';
  }

  public makeActive(note: Note) {
    this.notes.forEach((n) => (n.isActive = false));
    note.isActive = true;
  }

  public deleteNote(note: Note) {
    this.notes = this.notes.filter((n) => n.id !== note.id);
  }

  public editNote(note: Note) {
    this.editMode = true;
    this.noteTitle = note.title;
    this.noteContent = note.content;
    this.editedNoteId = note.id;
  }
}
