

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
    
    if(type == 'is-a1'){
        association.setDashed();
        association.setTitle("inherits");
        return;
    }
   
    if(type == 'is-a2'){
        association.setSolid();
        association.setTitle("implements");
        return;
    }
   
    if(type == 'has-a'){
        association.setSolid();
        association.setTitle("composes");
        return;
    }
    
    if(type == 'use'){
        association.destroyElement();                  
        association.setArrawed();
        association.createElement(paper);
        association.setTitle("uses");
        return;
    }
    
    if(type == 'extend'){
        association.destroyElement();                  
        association.setArrawed();
        association.createElement(paper);
        association.setTitle("<extends>");
        return;
    }

    if(type == 'include'){
        association.destroyElement();                  
        association.setArrawed();
        association.createElement(paper);
        association.setTitle("<includs>");
        return;
    }
    
}