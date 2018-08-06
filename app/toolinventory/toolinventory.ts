import { inherits } from "util";

    export class ToolSetUp
    {
        ID: number;
        Sequence: string;
        N: string;
        ToolNumber: string;
        TONumber: string;
        CuttingMethod: string;
        SpecialComment: string;
        PartsPerCorner: number;
        SecondsPerTool: number;
        Snippet: string;
        ToolItem: string;
        ToolName: string;
        ToolMWID: string;
        ToolDesc: string;
        ToolLoc: string;
        ToolHolder1Item: string;
        ToolHolder1Name: string;
        ToolHolder1MWID: string;
        ToolHolder1Loc: string;
        ToolHolder2Item: string;
        ToolHolder2Name: string;
        ToolHolder2MWID: string;
        ToolHolder2Loc: string;
        ToolHolder3Item: string;
        ToolHolder3Name: string;
        ToolHolder3MWID: string;
        ToolHolder3Loc: string;
        ToolID: string;
        ToolHolder1ID: string;
        ToolHolder2ID: string;
        ToolHolder3ID: string;
        ToolImage: string;
        ToolHolder1Image: string;
        ToolHolder2Image: string;
        ToolHolder3Image: string;
        Comment: string;
        ModifiedBy: string;
    }
    export class ToolSetupSheet
    {
        SetUpSheetID: number;
        PartNumber: string;
        PartName: string;
        Revision: string;
        Operation: string;
        Machine: string;
        InputDate: string;
        ProgramNumber: string;
        ProgramLocation: string;
        UOM: string;
        MaterialType: string;
        MaterialHeatTreated: string;
        MaterialForm: string;
        MaterialSize: string;
        MachineWorkHoldingTo: string;
        CutWorkHoldingTo: string;        
        workHolding1ItemNumber: string;

        workHolding2ItemNumber: string;
        workHolding3ItemNumber: string;
        workHolding1ImagePath: string;
        workHolding2ImagePath: string;
        workHolding3ImagePath: string;
        workHolding1MWID: string;
        workHolding2MWID: string;
        workHolding3MWID: string;
        workHolding1Location: string;
        workHolding2Location: string;
        workHolding3Location: string;
        workHoldingComments: string;
        workHoldingImageNoPart: string;
        workHoldingImageWithPart: string;
        workHoldingImageComplete: string;
        Torque: string;
        HoldPartOn: string;
        BarStickOutBefore: string;
        FaceOff: string;
        Z0: string;
        CutOffToolThickness: string;
        OAL: string;
        BarStickOutAfter: string;
        BarPullOut: string;
        PartStickOutMinimum: string;
        Comments: string;
        Program: string;
        ModifiedBy: string;
        ToolsSetUp: ToolSetUp[];

    }

    export class MWJsonResponse
    {
        success: boolean;
        message: string;
    }

    export class ToolSetupSheetHeader
    {
        ID: number;
        PartNumber: string;
        PartName: string;
        Revision: string;
        Operation: string;
    }

    export class ConversionRule
    {
        ID: number;
        FromMachineId: string;
        ToMachineId: string;
        FromSnippet: string;
        ToSnippet: string;
        ModifiedBy: string;
    }
    
    export class ConvertedProgramRequest
    {
        SetUpSheetID: number;
        Program: string;
        MachineId: string;
        ModifiedBy: string;
    }

    export class ToolSetupGroupRequest
    {
        MainID: number;
        IDs: number[];
        ModifiedBy: string;
    }

    export class ToolSetupSearchResult
    {
        ID: number;
        SpecialComment: string;
        GroupType: string;
    }

    export class AddToolSetupRequest
    {
        SetUpSheetID: number;
        ID_GroupType: string[];
        ModifiedBy: string;
    }

    export class DeleteToolSetupRequest
    {
        SetupSheetID: number;
        ToolSetupID: number;
        ModifiedBy: string;
    }

    export class ProgramSaveRequest
    {
        Program: string;
        MachineID: string;
        SetUpSheetID: number;
        ModifiedBy: string;
    }

    export class UploadProgramRequest
    {
        SetUpSheetID: number;
        UseExistingSheet: boolean;
        UploadedProgramText: string;        
        ModifiedBy: string;
    }
    export class ConvertProgramRequest
    {
        Program: string;
        FromMachineID: string;
        ToMachineID: string;
    }

    export class SaveCodeColumnsRequest
    {
        Code: string;
        Columns: string;        
    }

    export class CopyCodeColumnsRequest
    {
        Code: string;
        CopyToCode: string;
    }
    export class ToolSetupSearchRequest
    {
        SearchTerm: string;
    }

    export class LookUpRequest
    {
        Category: string;
        SearchTerm: string;
    }

    export class CheckOutCheckInItem
    {
        ID: number;
        Qty: number;
    }
    export class CheckOutCheckInRequest
    {
        Action: string;
        ModifiedBy: string;
        CheckOutCheckInItems: CheckOutCheckInItem[];
    }
    //SaveLookupCategoryRequest
    export class SaveLookupCategoryRequest
    {
        Category: string;
        ModifiedBy: string;
        LookupCategoryValues: LookupCategoryValue[];
    }
    export class ToolCuttingMethod
    {
        ID: number;
        Text: string;
        Value: string;
        Connected: boolean;
    }
        export class ToolInventoryColumn
    {
        Name: string;
        Header: string;
        Searchable: boolean;
        Sequence: number;
        RelatedTable: string;
        RelatedIDField: string;
        RelatedTextField: string;
        InputType: string;
        UISize: number;
        PropertyName: string;
        Display: boolean;
        Required: string;        

    }

    export class ToolInventoryCodeColumn
    {
        Name: string;
        Header: string;
        Show: boolean;
        Sequence: number;
    }

    export class ToolInventorySearch
    {
        Code?: string[];
        Name?: string;
        ItemNumber?: string;
        CategoryID?: string;
        MWID?: string;
        Radius?: string;
        NumberOfCutters?: string;
        ChipBreaker?: string;
        Material?: string;
        Grade?: string;
        Location?: string;
        ExternalLocation?: string;
        Manufacturer?: string;
        Comment?: string;
        StatusID?: string;
        ToolGroupNumber?: string;
        Description?: string;
        CuttingMethods?: string;
        PageNumber?: number;
        PageSize?: number;
        SortColumn?: string;
        SortDirection?: string;
        SelectedToolIDs?: string[];
        mwHid?: string;
    }

    export class LookupCategorySearch
    {
        Category: string;
        PageNumber: number;
        PageSize: number;        
    }

    export class ToolInventorySearchResult
    {
        ID: number;
        Unit: string;
        Code: string;
        Name: string;
        ItemNumber: string;
        Manufacturer: string;
        OrganizationID: string;
        MWID: string;
        Location: string;
        Radius: string;
        CuttingMethods: string;
        NumOfCutters: string;
        Material: string;
        Grade: string;

        OnHand: string;
        ChipBreaker: string;
        CheckedOut: string;
        Comment: string;
        Description: string;
        ExternalLocation: string;
        CategoryName: string;
        CategoryID: string;
        Status: string;
        StatusID: string;
        isLocked: string;
        OrderPoint: string;
        InventoryLevel: string;
        ToolGroupNumber: string;
        UnitPrice: string;
        PackSize: string;        
        ImagePath: string;
        Angle: string;
        Diameter: string;
        Direction: string;
        FluteLength: string;
        ImageCode: string;
        isSent: string;
        LBS: string;
        MachineNumber: string;
        MaxDepthOfCut: string;
        NewAppDate: string;
        NumOfFlutes: string;
        OAL: string;
        POID: string;
        ShankDiameter: string;
        NeckDiameter: string;
        StationNumber: string;
        OrderApproved: string;
        Width: string;
        MWHID: string;
        LinkedTools: LinkedTool[];
        OrganizationInfo: OrganizationInfo;
    }

    export class ToolInventorySaveRequest
    {
        iD: number;
        unit: string;
        code: string;
        name: string;
        itemNumber: string;
        manufacturer: string;
        organizationID: string;
        mWID: string;
        location: string;
        radius: string;
        numOfCutters: string;
        material: string;
        grade: string;

        onHand: string;
        chipBreaker: string;
        checkedOut: string;
        comment: string;
        description: string;
        externalLocation: string;
        categoryID: string;
        statusID: string;
        isLocked: string;
        orderPoint: string;
        inventoryLevel: string;
        toolGroupNumber: string;
        unitPrice: string;
        packSize: string;
        imagePath: string;
        angle: string;
        diameter: string;
        direction: string;
        fluteLength: string;
        imageCode: string;
        isSent: string;
        lBS: string;
        machineNumber: string;
        maxDepthOfCut: string;
        newAppDate: string;
        numOfFlutes: string;
        oAL: string;
        pOID: string;
        shankDiameter: string;
        neckDiameter: string;
        stationNumber: string;
        orderApproved: string;
        width: string;
        cuttingMethodID: string[]; 
    }

    export class LinkedTool
    {        
        ID: number;
        Description: string;
        ImagePath: string;
    }

    export class LinkToolRequest
    {
        ParentID: number;
        ChildIDs: number[];
        Action: string;        
    }
    export class ToolInventorySearchResults
    {
        searchResults: ToolInventorySearchResult[];
        recordCount: number;        
    }

    export class LookupCategories
    {
        lookupCategoryValues: LookupCategoryValue[];
        RecordCount: number;
    }
    export class LookupCategoryValue
    {
        ID: number;
        Text: string;
        Value: string;
        Active: boolean;
    }

    export class Company
    {
        ID: number;
        CompanyName: string;
        CompanyID: string;
        Active: boolean;
    }

    export class OrganizationInfo
    {
        ID: number;       
        CompanyName: string;
        Address1: string;
        Address2: string;
        City: string;
        State: string;
        Zip: string;
        Country: string;
        FirstName: string;
        LastName: string;
        Dept: string;
        Phone: string;
        Fax: string;
        Mobile: string;
        TollFree: string;
        Email: string;
        Website: string;
    }


    export interface Lookup
    {
        Id: number;
        Text: string;
        Value: string;
        Category: string;
        Active: boolean;
        Sequence: string;
    }

    export interface APIResponse
    {
        ResponseCode: number;
        ResponseText: string;
    }

    export class CuttingMethodTemplate
    {
        Id: number;
        CuttingMethod: string;
        Template: string;        
    }

    export interface DBResponse
    {
        ReturnCode: number;
        RecordsAffected: number;
        Message: string;
    }

    export interface CuttingMethodSnippet
    {
        CuttingMethod: number;
        Snippet: string;
    }
