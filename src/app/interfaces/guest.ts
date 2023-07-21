export interface Guest {
    GuestId: number;
    UniversalPlayerId: string;
    FirstName: string;
    LastName: string;
    Gender: string;
    Birthday: Date;
    BirthdayDisplay: string;
    Email: string;
    PhoneNumber: number;
    Zip: string;
    AcquisitionSource: string;
    AcquisitionDate: Date;
    AcquisitionDateDisplay: string;
    ConversionDate: Date;
    Interests?: (string)[] | null;
  }
