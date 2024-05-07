import { EntityType } from '@noodles-ui/core-entities';
import {
    CodeXmlIcon,
    ComponentIcon,
    FileCode2Icon,
    HexagonIcon,
    LayersIcon,
    PaletteIcon,
    SquareStackIcon,
} from 'lucide-solid';
import { Component } from 'solid-js';

export const ENTITY_TYPE_ICONS: Record<EntityType, Component> = {
    system: CodeXmlIcon,
    surface: LayersIcon,
    mixin: FileCode2Icon,
    variant: SquareStackIcon,
    component: ComponentIcon,
    token: HexagonIcon,
    theme: PaletteIcon,
};
