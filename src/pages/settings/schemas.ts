
import * as z from 'zod';

// Schema for the company profile form
export const companyProfileSchema = z.object({
  nome_empresa: z.string().min(2, { message: 'Nome da empresa é obrigatório' }),
  telefone_empresa: z.string().optional(),
  endereco_empresa: z.string().optional(),
  produto_principal: z.string(),
  cnpj: z.string().optional()
});

// Schema for the WhatsApp integration form
export const whatsappSchema = z.object({
  whatsapp_url_servidor: z.string().optional(),
  whatsapp_api_key: z.string().optional(),
  whatsapp_instancia: z.string().optional(),
  whatsapp_numero: z.string().optional(),
  whatsapp_webhook_url: z.string().optional(),
  whatsapp_webhook_conectado: z.boolean().optional(),
  whatsapp_status: z.string().optional(),
  whatsapp_nome_perfil: z.string().optional()
});

// Schema for the OpenAI integration form
export const openaiSchema = z.object({
  openai_token: z.string().optional(),
  openai_assistente_id: z.string().optional(),
  openai_modelo_preferido: z.string(),
  openai_ativo: z.boolean().optional()
});

// Schema for the Facebook integration form
export const facebookSchema = z.object({
  facebook_token_pagina: z.string().optional(),
  facebook_token_usuario: z.string().optional(),
  facebook_token_api: z.string().optional(),
  facebook_pixel_id: z.string().optional(),
  facebook_app_id: z.string().optional(),
  facebook_ativo: z.boolean().optional()
});

// Schema for the Braip integration form
export const braipSchema = z.object({
  braip_webhook_url: z.string().optional(),
  braip_token: z.string().optional(),
  braip_ativo: z.boolean().optional()
});

// Schema for the Keed integration form
export const keedSchema = z.object({
  keed_webhook_url: z.string().optional(),
  keed_token: z.string().optional(),
  keed_ativo: z.boolean().optional()
});

// Schema for the Payt integration form
export const paytSchema = z.object({
  payt_webhook_url: z.string().optional(),
  payt_token: z.string().optional(),
  payt_ativo: z.boolean().optional()
});

// Schema for the Google Sheets integration form
export const googleSheetsSchema = z.object({
  google_sheets_token: z.string().optional(),
  google_sheets_id_planilha: z.string().optional(),
  google_sheets_ativo: z.boolean().optional()
});

// Export form value types
export type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>;
export type WhatsappFormValues = z.infer<typeof whatsappSchema>;
export type OpenAIFormValues = z.infer<typeof openaiSchema>;
export type FacebookFormValues = z.infer<typeof facebookSchema>;
export type BraipFormValues = z.infer<typeof braipSchema>;
export type KeedFormValues = z.infer<typeof keedSchema>;
export type PaytFormValues = z.infer<typeof paytSchema>;
export type GoogleSheetsFormValues = z.infer<typeof googleSheetsSchema>;
