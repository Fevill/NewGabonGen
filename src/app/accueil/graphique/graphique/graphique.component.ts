import { SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSyncService } from 'gojs-angular';
import { Index } from 'typeorm';
import OrgChart from '../../../../assets/js/orgchart.js';
import { ClanService, PersonneService } from '../../../core/services';
import { Clan } from '../../../entity/Clan.js';
import { Personne } from '../../../entity/Personne.js';
import { LinkPersonne, NodeChart, NodePersonne } from '../../../model/node-chart';
declare var $: any;
import * as go from 'gojs';

@Component({
  selector: 'app-graphique',
  templateUrl: './graphique.component.html',
  styleUrls: ['./graphique.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphiqueComponent implements OnInit {


  personnes: Personne[];
  clans: Clan[] = [];
  searchForm: FormGroup;
  x: string;
  currentClan: Clan
  dataSource
  orgchart
  diagram
  myDiagram


  public diagramNodeData: Array<NodePersonne> = [];
  public diagramLinkData: Array<LinkPersonne> = [];
  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;

  constructor(private _fb: FormBuilder, private _personneService: PersonneService, private _clanService: ClanService) {
    this.createForm();
  }

  items: any[];

  createForm() {
    this.searchForm = this._fb.group({
      nom: ['', Validators.required]
    });
  }

  getClans() {
    console.log("Récuperer la liste des clans")
    this._clanService.getClans().subscribe(data => {
      this.clans = data;
      this.currentClan = this.clans.find(c => c.id == 1)
    });
  }

  ngOnInit(): void {
    this.getClans();
    this._personneService.getPersonnes()
      .subscribe(data => {
        this.personnes = data;
        data.forEach((personne: Personne) => {
          if (this.currentClan.id === personne.clan.id) {
            let node = new NodePersonne
            node.personneToNode(personne);
            this.diagramNodeData.push(node);
            this.diagramLinkData.push(new LinkPersonne(personne));
          }
        });
        this.drawChart(data)
      });
    this.initDia();
  }

  drawChart(data) {
    this.dataSource = new NodeChart();
    this.dataSource.id = 1;
    this.dataSource.name = "Clan";
    this.dataSource.title = this.currentClan.nom;
    this.dataSource.children = this.returnNode(data, 1);
    this.dataSource.nodeChildren = this.returnNode(data, 1);

  }



  initDia() {
    const $ = go.GraphObject.make;  // for conciseness in defining templates

    this.myDiagram =
      $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
          "undoManager.isEnabled": true
        });

    // This converter is used by the Picture.
    function findHeadShot(key) {
      if (key < 0 || key > 16) return "images/HSnopic.jpg"; // There are only 16 images on the server
      return "images/HS" + key + ".jpg"
    }

    function textStyle() {
      return { font: "9pt  Quicksand ", stroke: "#ffffff" };
    }

    this.myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        { locationSpot: go.Spot.Center },
        $(go.Shape, "RoundedRectangle",
          {
            fill: "white", // the default fill, if there is no data bound value
            portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
            // allow all kinds of links from and to this port
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          {
            font: "bold 14px sans-serif",
            stroke: '#333',
            margin: 6,  // make some extra space for the shape around the text
            isMultiline: false,  // don't allow newlines in text
            editable: true  // allow in-place editing by user
          },
          new go.Binding("text", "text").makeTwoWay()),  // the label shows the node data's text
      )


    this.myDiagram.nodeTemplate =
      $(go.Node, "Vertical",
        $(go.Panel, "Auto",
        $(go.Shape, "RoundedRectangle",
        {
          name: "SHAPE", strokeWidth: 1,
          portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
        }, new go.Binding('stroke', 'color'), new go.Binding('fill', 'color')),
        $(go.Panel, "Horizontal",
         $(go.Picture,
           {
             name: "Picture",
             desiredSize: new go.Size(70, 70),
             margin: 2,
           },
           new go.Binding("source", "picture")),
         // define the panel where the text will appear
         $(go.Panel, "Table",
           {
             minSize: new go.Size(130, NaN),
             maxSize: new go.Size(150, NaN),
             margin: new go.Margin(6, 10, 0, 6),
             defaultAlignment: go.Spot.Left
           },
           $(go.RowColumnDefinition, { column: 2, width: 4 }),
           $(go.TextBlock, textStyle(),  // the name
             {
               row: 0, column: 0, columnSpan: 5,
               font: "12pt  Quicksand",
               editable: true, isMultiline: false,
               minSize: new go.Size(10, 16)
             },
             new go.Binding("text", "name").makeTwoWay())
         )  // end Table Panel
       ) ,
         
        ),$("TreeExpanderButton")
      );
    this.myDiagram.linkTemplate =
      $(go.Link, go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        $(go.Shape, { strokeWidth: 1.5, stroke: "#532d85" }));

    this.myDiagram.layout = $(go.TreeLayout, {
      treeStyle: go.TreeLayout.StyleLastParents,
      arrangement: go.TreeLayout.ArrangementHorizontal,
      angle: 90,
      layerSpacing: 35,
      alternateAngle: 90,
      alternateLayerSpacing: 35,
      alternateAlignment: go.TreeLayout.AlignmentBus,
      alternateNodeSpacing: 20
    });

    this.myDiagram.model.isReadOnly = true;
    this.reloadDiagram(this.diagramNodeData, this.diagramLinkData);
  }

  returnNode(personnes: Personne[], idPere: number) {
    let clanId = this.currentClan?.id ? this.currentClan?.id : 1;
    return personnes
      .filter(personne => personne.pere?.id == idPere)
      .filter(personne2 => personne2?.clan?.id == clanId)
      .map(personne => {
        let personneNode = new NodeChart
        personneNode.id = personne.id;
        personneNode.name = personne.nom.text;
        personneNode.title = personne.prenoms;
        personneNode.className = personne.sexe == 'H' ? 'homme' : personne.sexe == 'F' ?
          'femme' : personne.sexe == 'A' ? 'autre' : 'nondef';
        personneNode.index = personne.pere?.id;
        let children = this.returnNode(personnes, personne?.id)
        if (children.length > 0) {
          personneNode.children = children;
          personneNode.nodeChildren = children;
        }
        return personneNode
      })
  }

  reloadDiagram(node: any[], link: any[], parms?: any[]) {
    this.myDiagram.model = new go.GraphLinksModel(node, link);
  }

  /**
   * Changement d'un clan
   */
  selectclan() {
    this.diagramNodeData = [];
    this.diagramLinkData = [];
    this.drawChart(this.personnes);
    this.personnes.forEach((personne:Personne) => {
      if (this.currentClan.id === personne.clan.id) {
        let node = new NodePersonne
        node.personneToNode(personne);
        this.diagramNodeData.push(node);
        this.diagramLinkData.push(new LinkPersonne(personne));
      }
    });
    this.reloadDiagram(this.diagramNodeData, this.diagramLinkData);
    this.myDiagram.zoomToFit();
  }

  valider() {
    console.log("Valider");
  }
  
  myCallback(blob) {
    var url = window.URL.createObjectURL(blob);
    var filename = "mySVGFile.svg";

    var a : any = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    if (window.navigator.msSaveBlob !== undefined) {
      window.navigator.msSaveBlob(blob, filename);
      return;
    }

    document.body.appendChild(a);
    requestAnimationFrame(function() {
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  exportImg() {
    var svg = this.myDiagram.makeSvg({ scale: 1, background: "white" });
    var svgstr = new XMLSerializer().serializeToString(svg);
    var blob = new Blob([svgstr], { type: "image/svg+xml" });
    this.myCallback(blob);
  }

}
