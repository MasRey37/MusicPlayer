import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import { Howl } from 'howler';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  playlist: Track[] = [
    {
      name: 'ALDI TAHER - YELLOW',
      path: './assets/mp3/ALDI TAHER - LOOK AT THE START _ YELLOW.mp3',
    },
    {
      name: 'JOKOWI - SEVENTEEN JKT48 (COVER AI)',
      path: './assets/mp3/JOKOWI - SEVENTEEN JKT48 (COVER AI).mp3',
    },
    {
      name: 'KLEBUS - JOKOWI COVER Ai dalane rame atiku sepi',
      path: './assets/mp3/KLEBUS - JOKOWI COVER Ai dalane rame atiku sepi.mp3',
    },
    {
      name: 'NEMEN - PAK JOKOWID _ Al Cover',
      path: './assets/mp3/NEMEN - PAK JOKOWID _ Al Cover.mp3',
    },
    {
      name: 'Duka - Ai Cover Jokowi',
      path: './assets/mp3/Duka - Ai Cover Jokowi.mp3',
    },
    {
      name: 'Doechii ft. Kodak Black — What it is',
      path: './assets/mp3/Doechii ft. Kodak Black — What it is.mp3',
    },
  ];

  activeTrack: Track | null = null;
  player: Howl | null = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range!: IonRange;

  constructor() {}

  start(track: Track | null) {
    if (this.player) {
      this.player.stop();
    }
    if (track) {
      this.player = new Howl({
        src: [track.path],
        onplay: () => {
          console.log('onplay');
          this.isPlaying = true;
          this.activeTrack = track;
          this.updateProgress();
        },
        onend: () => {
          console.log('onend');
        },
      });
      this.player.play();
    }
  }

  togglePlayer(pause: any) {
    this.isPlaying = !pause;
    if (pause && this.player) {
      this.player?.pause();
    } else if (this.player) {
      this.player.play();
    }
  }

  next() {
    if (this.activeTrack) {
      let index = this.playlist.indexOf(this.activeTrack);
      if (index != this.playlist.length - 1) {
        this.start(this.playlist[index + 1]);
      } else {
        this.start(this.playlist[0]);
      }
    }
  }

  prev() {
    if (this.activeTrack) {
      let index = this.playlist.indexOf(this.activeTrack);
      if (index > 0) {
        this.start(this.playlist[index - 1]);
      } else {
        this.start(this.playlist[this.playlist.length - 1]);
      }
    }
  }

  seek() {
    let newValue = +this.range.value;
    if (this.player) {
      let duration = this.player.duration();
      this.player.seek(duration * (newValue / 100));
    }
  }

  updateProgress() {
    if (this.player) {
      let seek = this.player.seek();
      this.progress = (seek / this.player.duration()) * 100 || 0;
    }
    setTimeout(() => {
      this.updateProgress();
    }, 100);
  }
}
