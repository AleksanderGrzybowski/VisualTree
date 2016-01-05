/// <reference path="RBNode.ts"/>

interface RBInterface {
    isNil():boolean;
    height():number;
    parent:RBNode;
    color: string;
    insertCase1();
    insertCase2();
    insertCase3();
    insertCase4();
    insertCase5();
    
    left: RBInterface;
    right: RBInterface;
}