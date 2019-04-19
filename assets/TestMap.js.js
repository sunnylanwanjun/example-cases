// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tiledNode: {
            default: null,
            type: cc.Node,
        },
        tiledLayer: {
            default: null,
            type: cc.TiledLayer,
        },
        tplNode: {
            default: null,
            type:cc.Prefab,
        },
        countLabel: {
            default: null,
            type:cc.Label,
        },
        userNodeLabel: {
            default: null,
            type:cc.EditBox,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        this.userNodeList = [];
        for (let i = 0; i < 5; i++) {
            this.addUserNode();
        }
    },

    addUserNode () {
        let userNode = cc.instantiate(this.tplNode);
        let number = userNode.getChildByName('number');
        let numberLabel = number.getComponent(cc.Label);
        numberLabel.string = this.userNodeList.length;
        userNode.x = this.tiledNode.width/2;
        userNode.y = this.tiledNode.height/2;
        userNode.name = "player" + this.userNodeList.length;
        this.userNodeList.push(userNode);
        this.tiledLayer.addUserNode(userNode);
        this.countLabel.string = this.userNodeList.length;
    },

    destroyUserNode () {
        let userNode = this.userNodeList.pop();
        this.tiledLayer.destroyUserNode(userNode);
        this.countLabel.string = this.userNodeList.length;
    },

    moveMap (event, dir) {
        switch(dir) {
            case 'left':
            this.tiledNode.x -= 5;
            break;
            case 'right':
            this.tiledNode.x += 5;
            break;
            case 'up':
            this.tiledNode.y += 5;
            break;
            case 'down':
            this.tiledNode.y -= 5;
            break;
        }
    },

    moveNode (event, dir) {
        let index = parseInt(this.userNodeLabel.string);
        let node = this.userNodeList[index];
        if (node) {
            switch(dir) {
                case 'left':
                node.x -= 5;
                break;
                case 'right':
                node.x += 5;
                break;
                case 'up':
                node.y += 5;
                break;
                case 'down':
                node.y -= 5;
                break;
            }
        }
    },

    // update (dt) {},
});
