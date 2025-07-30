export interface CreatePanelDataInterface {
    panelName: string;
    panelDescription: string;
    panelIcon: string | null;
    panelCoverPic: string | null;
    panelTags: [string] | [];
    panelColor: string | null;
}

export interface UpdatePanelDataInterface {
    panelName: string|null;
    panelDescription: string|null;
    panelIcon: string | null;
    panelCoverPic: string | null;
    panelTags: [string] | [];
    panelColor: string | null;
}