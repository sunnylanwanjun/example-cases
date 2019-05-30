cc.Class({
    extends: cc.Component,

    properties: {
        robot:{
            type:dragonBones.ArmatureDisplay,
            default:null,
        },
        knife:{
            type:dragonBones.ArmatureDisplay,
            default:null,
        }
    },

    start () {
        this.knife.node.active = false;
        this._leftWeaponIndex = 0;
        this._rightDisplayIndex = 0;
        this._rightDisplayNames = ["weapon_1004_r", "weapon_1004b_r", "weapon_1004c_r", "weapon_1004d_r", "weapon_1004e_r"];
        this._rightDisplayOffset = [{x:0,y:0}, {x:28,y:50}, {x:28,y:50}, {x:-60,y:-100}, {x:30,y:90}];
        //this._rightDisplayOffset = [{x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:-60,y:-100}, {x:0,y:0}];
    },

    left () {
        this._leftWeaponIndex++;
        this._leftWeaponIndex %= 5;
        let robotArmature = this.robot.armature();
        let robotSlot = robotArmature.getSlot("weapon_hand_l");
        robotSlot.displayIndex = this._leftWeaponIndex;
    },

    right () {
        this._rightDisplayIndex++;
        this._rightDisplayIndex %= 5;
        let robotArmature = this.robot.armature();
        let robotSlot = robotArmature.getSlot("weapon_hand_r");
        const displayName = this._rightDisplayNames[this._rightDisplayIndex];
        let factory = dragonBones.CCFactory.getInstance();
        factory.replaceSlotDisplay(this.knife.getArmatureKey(), "weapon", "weapon_r", displayName, robotSlot);

        let offset = this._rightDisplayOffset[this._rightDisplayIndex];
        robotSlot.parent.offset.x = offset.x;
        robotSlot.parent.offset.y = offset.y;
        robotArmature.invalidUpdate();
    },
});
