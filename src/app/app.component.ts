import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  public saveNote() {
    this.notes.push({
      id: crypto.randomUUID(),
      title: this.noteTitle,
      content: this.noteContent,
      isActive: false,
    });

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
}
