import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveService } from '../services/hive.service';
import { HiveSectionService } from '../services/hive-section.service'
import { HiveSection } from '../models/hive-section';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0, "", "", 0, false, "");
  hiveId : number;
  existed = false;
  
  constructor(
    private route: ActivatedRoute,
    private hiveSectionService : HiveSectionService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.hiveId = Number(p['hiveId']);
      if (p['id'] === undefined) return;
      this.hiveSectionService.getHiveSection(p['id']).subscribe(h => this.hiveSection = h);
      this.existed = true;
    });
  }

  onSubmit() {
    this.hiveSection.hiveId = this.hiveId;
    if (this.hiveSection.id == 0){
      this.hiveSectionService.addHiveSection(this.hiveSection).subscribe(h => this.hiveSection.id = h.id);
    }
    else{
      this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe();
    }
  }

  onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, true).subscribe();
  }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe();
  }

  onPurge() {
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe();
  }
}
