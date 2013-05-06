

function ElementsFactory(type){
    
    if(type == 'class'){
        return new ClassDiagram();
    }
    
    if(type == 'usecase'){
        return new Usercase();
    }
    
    if(type == 'actor'){
        return new Actor();
    }
    
    return null;
}

function AssociationsStyler(type,association,paper){
    
    var xyz = null;
    
    if(type == 'is-a1'){
        association.setDashed();
        association.setTitle("inherits");
    }
   
    if(type == 'is-a2'){
        association.setTitle("implements");
    }
   
    if(type == 'has-a'){
        xyz = new Diamond();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("composes");
    }

    if(type == 'has-a2'){
        xyz = new Diamond();
        xyz.createElement(paper);
        xyz.applyAttr({"fill":"black"});
        association.setAssociationElement(xyz);
        association.setTitle("Aggregation");
    }
    
    if(type == 'use'){                 
        xyz = new Arraw();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("uses");
    }
    
    if(type == 'extend'){
        xyz = new Arraw();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("<extends>");
    }

    if(type == 'include'){
        xyz = new Arraw();
        xyz.createElement(paper);
        association.setAssociationElement(xyz);
        association.setTitle("<includs>");
    }
    
    association.setWidth(15);
    association.setHeight(25);
}