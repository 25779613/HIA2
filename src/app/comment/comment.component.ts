import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { Comments } from './comments';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comments$ = this.commentService.getComments();
  //plucking the key from the stream
  comment$ = this.activatedRoute.data.pipe(pluck('comment'));
  comment: Comments[] = [];
  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this will display the incoming data to the console in the webpage
    this.activatedRoute.data.subscribe((data) => { console.log(data['comments']) });
    //collect the data
    this.activatedRoute.data.subscribe((data) => data['comments'])
  };
}

