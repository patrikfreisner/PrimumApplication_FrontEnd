import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dp-loading',
  templateUrl: './dp-loading.component.html',
  styleUrls: ['./dp-loading.component.css']
})
export class DpLoadingComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $(document).ready(function () {
      const screen = $(window).height() - ($(window).height() * 0.10);
      $('#body').height(screen + 'px');
    });

    for (let i = 0; i < 30; i++) {
      $('#loadingmessage').fadeOut('slow');
      $('#loadingmessage').fadeIn('slow');
    }
  }

  onResize() {
    $(document).ready(function () {
      const screen = $(window).height() - ($(window).height() * 0.10);
      $('#body').height(screen + 'px');
      $(window).resize(function () {
        $('#body').height(screen + 'px');
      });
    });
  }

}
