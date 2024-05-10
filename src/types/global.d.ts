export type ID = number | null;
interface UserData {
	name: string | undefined;
	email: string | undefined;
	number: string | undefined;
	gender: string | undefined;
	city: string | undefined;
	courseIntrested: string | undefined;
}

export interface InformationProps {
	userMetaId: ID;
	setSelectedOption: Function;
	userData: UserData;
}

interface GraduationDetails {
	id: string;
	institutionName: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	course: string;
}

interface SecondaryEducationDetails {
	id: string;
	schoolName: string;
	city: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	board: string;
	stream: string;
}

interface primaryEducation {
	id: string;
	schoolName: string;
	city: string;
	passingYear: string;
	gradingSystem: string;
	grade: string;
	board: string;
}

// Define the interface for EducationDetailsData
export interface EducationDetailsProps {
	userMetaId: ID;
	setSelectedOption: Function;
	primaryEducation?: primaryEducation[];
	secondaryEducation?: SecondaryEducationDetails[];
	graduation?: GraduationDetails[];
}