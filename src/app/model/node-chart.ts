import { Personne } from "../entity/Personne";

export class NodeChart {
    id: any;
    key: any;
    name: string
    title: string
    index: number
    className: string
    children: NodeChart[]
    nodeChildren: NodeChart[]

    constructor() {
        this.name = "";
        this.title = "";
        this.children = null;
        this.nodeChildren = null;
    }

}


export class NodePersonne {
    key: number;
    name: string;
    color: string;
    picture: any;
    children: Array<NodePersonne>;
    expanded: boolean;

    constructor(personne?: Personne) {
        /*if (personne) {
            this.personneToNode(personne);
        }*/
    }

    /**
     * Convertire un personne sous forme de noeud gojs
     */
    personneToNode(personne: Personne): void {
        if (personne) {
            this.key = personne?.id;
            this.name = personne.nom.text + " - " + personne.prenoms;
            this.picture = personne.photo;
            this.color = personne.sexe == 'H' ? '#10ac84' : personne.sexe == 'F' ?
                '#ff6b81' : personne.sexe == 'A' ? '#1e90ff' : '#ffa502';
            this.children = [];
            if (personne.enfants != undefined) {
                personne.enfants.forEach(element => {
                    let tmpNodePersonne: NodePersonne = new NodePersonne;
                    tmpNodePersonne.personneToNode(element);
                    this.children.push(tmpNodePersonne);
                });
            }
            this.expanded = true;
        }
    }

    collapseChild(nodes: Array<NodePersonne>): Array<NodePersonne> {
        this.children.forEach((child: NodePersonne) => {
            nodes = nodes.filter((n: NodePersonne) => n?.key != child.key)
            nodes = child.collapseChild(nodes);
        });
        this.expanded = false;
        return nodes;
    }


}

export class LinkPersonne {
    from: number;
    to: number;

    constructor(personne: Personne) {
        this.from = personne?.pere?.id;
        this.to = personne?.id;
    }
}


