import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PostsService} from 'src/app/shared/services/posts.service';
import {Post} from 'src/app/shared/interfaces';
import {AlertService} from 'src/app/shared/services/alert.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  @ViewChild('authorCheckBox') authorCheckBox: ElementRef;
  public Editor = ClassicEditor;

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { title, author, text } = this.form.value;
    const post: Post = {
      title,
      text,
      author: this.authorCheckBox.nativeElement.checked ? 'anonymous' : author,
      date: new Date()
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
    });
  }

  checkSome() {
    console.log(this.authorCheckBox.nativeElement.checked);
  }
}
