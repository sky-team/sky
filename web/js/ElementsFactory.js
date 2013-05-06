function ElementsFactory(type){
    var shape = null;
    if(type == 'c-1'){
        shape = new ClassDiagram();
    }else
    if(type == 'c-2'){
        shape = new ClassDiagram();
        shape.setStereotype("<interface>");
    }else
    if(type == 'u-2'){
        shape = new Usercase();
    }else
    if(type == 'u-1'){
        shape = new Actor();
    }
    
    return shape;
}

function AssociationsStyler(type,association,paper){
    
    var xyz = null;
    
    if(type == 'c-3'){
        association.setTitle("inherits");
        //association.type = "c-3";
    }
   
    if(type == 'c-5'){
        association.setSolid();
        association.setTitle("implements");
        //association.type = "c-5";
    }
   
    if(type == 'c-4'){
        xyz = new Diamond();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("composes");
        //association.type = "c-4";
    }

    if(type == 'c-6'){
        xyz = new Diamond();
        xyz.createElement(paper);
        xyz.applyAttr({"fill":"black"});
        association.setAssociationElement(xyz);
        association.setTitle("Aggregate");
       // association.type = "c-6";
    }
    
    if(type == 'u-3'){                 
        xyz = new Arraw();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("uses");
        //association.type = "u-3";
    }
    
    if(type == 'u-5'){
        xyz = new Arraw();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("<extends>");
        //association.type = "u-5";
    }

    if(type == 'u-4'){
        xyz = new Arraw();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("<includs>");
        //association.type = "u-4";
    }
    association.type = type;
    association.setWidth(15);
    association.setHeight(25);
}