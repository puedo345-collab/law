/**
 * Types & Interfaces for Personal Rehabilitation & Bankruptcy Consultations
 */

export interface ConsultationRequest {
  id?: string;
  name: string;
  phone: string;
  debtAmount: number; // in 10,000 KRW (만원)
  income: number; // monthly income in 10,000 KRW (만원)
  assetAmount: number; // in 10,000 KRW (만원)
  dependents: number; // 부양가족 수
  debtReason: string; // 채무 발생 사유
  location: string; // 거주 지역
  isJobStable: boolean; // 소득의 정기성 유무
  extraMessage?: string;
  createdAt?: string;
}

export interface ServiceProcessStep {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  details: string[];
}

export interface EligibilityChecklist {
  id: string;
  question: string;
  category: "rehabilitation" | "bankruptcy" | "both";
  isRequiredYes: boolean;
}

export interface SuccessCase {
  id: string;
  title: string;
  debtBefore: number; // 만원
  debtLeft: number; // 만원
  reductionRate: number; // 탕감율 %
  period: string; // 소요기간
  age: string;
  occupation: string;
  feedback: string;
  details: string;
}

export interface AiDiagnosisResult {
  recommendedType: "rehabilitation" | "bankruptcy" | "consultation_first";
  estimatedReductionRate: number; // 예상 탕감 비율 (0 ~ 90)
  monthlyPayment: number; // 예상 변제율 또는 변제금액 (만원)
  repaymentPeriod: number; // 36개월 or 60개월 등
  analysisText: string; // AI 상세 종합 의견 (Markdown 지원)
  isFallback: boolean;
}
