export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      BRAIP: {
        Row: {
          bairro: string | null
          "Cep do Cliente": string
          "Cidade do Cliente": string | null
          "Codigo da compra BRAIP": string | null
          Comissão: string | null
          "Complemento do Cliente": string | null
          "CPF do cliente": string | null
          "Data da alteração": string | null
          "Data da criação": string | null
          "Email do Cliente": string | null
          "Endereço _Rua/Av": string | null
          "Estado do Cliente": string | null
          "Forma de pagamento": string | null
          id: number
          "Nome do Cliente": string | null
          Numero_casa: string | null
          "Pay on Delivery": string | null
          "plano de tratamento": string | null
          Produto: string | null
          "Status da compra": string | null
          "Status do Pagamento": string | null
          "Tag meta": string | null
          Telefone: number | null
          "Tipo do frete": string | null
          upsell: string | null
          "Valor da compra": string | null
          "Valor do frete": string | null
          Vendedor: string | null
          Vendedor_email: string | null
          Vendedor_numero: number | null
        }
        Insert: {
          bairro?: string | null
          "Cep do Cliente": string
          "Cidade do Cliente"?: string | null
          "Codigo da compra BRAIP"?: string | null
          Comissão?: string | null
          "Complemento do Cliente"?: string | null
          "CPF do cliente"?: string | null
          "Data da alteração"?: string | null
          "Data da criação"?: string | null
          "Email do Cliente"?: string | null
          "Endereço _Rua/Av"?: string | null
          "Estado do Cliente"?: string | null
          "Forma de pagamento"?: string | null
          id?: number
          "Nome do Cliente"?: string | null
          Numero_casa?: string | null
          "Pay on Delivery"?: string | null
          "plano de tratamento"?: string | null
          Produto?: string | null
          "Status da compra"?: string | null
          "Status do Pagamento"?: string | null
          "Tag meta"?: string | null
          Telefone?: number | null
          "Tipo do frete"?: string | null
          upsell?: string | null
          "Valor da compra"?: string | null
          "Valor do frete"?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Update: {
          bairro?: string | null
          "Cep do Cliente"?: string
          "Cidade do Cliente"?: string | null
          "Codigo da compra BRAIP"?: string | null
          Comissão?: string | null
          "Complemento do Cliente"?: string | null
          "CPF do cliente"?: string | null
          "Data da alteração"?: string | null
          "Data da criação"?: string | null
          "Email do Cliente"?: string | null
          "Endereço _Rua/Av"?: string | null
          "Estado do Cliente"?: string | null
          "Forma de pagamento"?: string | null
          id?: number
          "Nome do Cliente"?: string | null
          Numero_casa?: string | null
          "Pay on Delivery"?: string | null
          "plano de tratamento"?: string | null
          Produto?: string | null
          "Status da compra"?: string | null
          "Status do Pagamento"?: string | null
          "Tag meta"?: string | null
          Telefone?: number | null
          "Tipo do frete"?: string | null
          upsell?: string | null
          "Valor da compra"?: string | null
          "Valor do frete"?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          message_type: string | null
          metadata: Json | null
          sender_id: string | null
          sender_name: string | null
          sender_type: string
          updated_at: string | null
          vendedor_user: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          metadata?: Json | null
          sender_id?: string | null
          sender_name?: string | null
          sender_type: string
          updated_at?: string | null
          vendedor_user?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          metadata?: Json | null
          sender_id?: string | null
          sender_name?: string | null
          sender_type?: string
          updated_at?: string | null
          vendedor_user?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          conversation_id: number
          created_at: string | null
          ESTADO_CONVERSA: string | null
          funil: string | null
          HISTORICO_CONVERSA: string | null
          id: number
          "Medicamentos Extração": string | null
          "Nome extração": string | null
          openai_thread: string | null
          Outros_problemas: string | null
          phone: string | null
          Remarketing: string | null
          "Sintomas Extração": string | null
          "Tempo problema Extração": string | null
          Time_is_active: boolean | null
          ULTIMA_INTERACAO_CLIENTE: string | null
          "Ultimo remarketing data": string | null
          user_id: number
        }
        Insert: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          openai_thread?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
          user_id: number
        }
        Update: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          openai_thread?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations_Bruno2: {
        Row: {
          conversation_id: number
          created_at: string | null
          ESTADO_CONVERSA: string | null
          funil: string | null
          HISTORICO_CONVERSA: string | null
          id: string
          "Medicamentos Extração": string | null
          "Nome extração": string | null
          openai_thread: string | null
          Outros_problemas: string | null
          phone: string | null
          Remarketing: string | null
          "Sintomas Extração": string | null
          "Tempo problema Extração": string | null
          Time_is_active: boolean | null
          ULTIMA_INTERACAO_CLIENTE: string | null
          "Ultimo remarketing data": string | null
        }
        Insert: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id: string
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          openai_thread?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
        }
        Update: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: string
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          openai_thread?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_Bruno2_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users_Bruno2"
            referencedColumns: ["id"]
          },
        ]
      }
      convites_cadastro: {
        Row: {
          criado_em: string | null
          criado_por: string
          email: string
          expira_em: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          token: string
          usado: boolean | null
        }
        Insert: {
          criado_em?: string | null
          criado_por: string
          email: string
          expira_em: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          token: string
          usado?: boolean | null
        }
        Update: {
          criado_em?: string | null
          criado_por?: string
          email?: string
          expira_em?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          token?: string
          usado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "convites_cadastro_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "sistema_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      "exemplos de quebras de objeções": {
        Row: {
          CONTEXTO: string | null
          HISTORICO_CONVERSA: string | null
          id: number
          RESPOSTA: string
        }
        Insert: {
          CONTEXTO?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          RESPOSTA: string
        }
        Update: {
          CONTEXTO?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          RESPOSTA?: string
        }
        Relationships: []
      }
      "exemplos de quebras de objeções_Bruno2": {
        Row: {
          CONTEXTO: string | null
          HISTORICO_CONVERSA: string | null
          id: number
          nome: string | null
          RESPOSTA: string
          sintomas: string | null
        }
        Insert: {
          CONTEXTO?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          nome?: string | null
          RESPOSTA: string
          sintomas?: string | null
        }
        Update: {
          CONTEXTO?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          nome?: string | null
          RESPOSTA?: string
          sintomas?: string | null
        }
        Relationships: []
      }
      KEED: {
        Row: {
          bairro: string | null
          "Cep do Cliente": string
          "Cidade do Cliente": string | null
          "Codigo da compra KEED": string | null
          "Complemento do Cliente": string | null
          "CPF do cliente": string | null
          "Data da alteração": string | null
          "Data da criação": string | null
          "Email do Cliente": string | null
          "Endereço _Rua/Av": string | null
          "Estado do Cliente": string | null
          "Forma de pagamento": string | null
          id: string
          "Nome do Cliente": string | null
          Numero_casa: string | null
          "Pay on Delivery": string | null
          "plano de tratamento": string | null
          Produto: string | null
          "Status da compra": string | null
          "Status do Pagamento": string | null
          Telefone: number | null
          "Valor da compra": string | null
          Vendedor: string | null
          Vendedor_email: string | null
          Vendedor_numero: number | null
        }
        Insert: {
          bairro?: string | null
          "Cep do Cliente": string
          "Cidade do Cliente"?: string | null
          "Codigo da compra KEED"?: string | null
          "Complemento do Cliente"?: string | null
          "CPF do cliente"?: string | null
          "Data da alteração"?: string | null
          "Data da criação"?: string | null
          "Email do Cliente"?: string | null
          "Endereço _Rua/Av"?: string | null
          "Estado do Cliente"?: string | null
          "Forma de pagamento"?: string | null
          id: string
          "Nome do Cliente"?: string | null
          Numero_casa?: string | null
          "Pay on Delivery"?: string | null
          "plano de tratamento"?: string | null
          Produto?: string | null
          "Status da compra"?: string | null
          "Status do Pagamento"?: string | null
          Telefone?: number | null
          "Valor da compra"?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Update: {
          bairro?: string | null
          "Cep do Cliente"?: string
          "Cidade do Cliente"?: string | null
          "Codigo da compra KEED"?: string | null
          "Complemento do Cliente"?: string | null
          "CPF do cliente"?: string | null
          "Data da alteração"?: string | null
          "Data da criação"?: string | null
          "Email do Cliente"?: string | null
          "Endereço _Rua/Av"?: string | null
          "Estado do Cliente"?: string | null
          "Forma de pagamento"?: string | null
          id?: string
          "Nome do Cliente"?: string | null
          Numero_casa?: string | null
          "Pay on Delivery"?: string | null
          "plano de tratamento"?: string | null
          Produto?: string | null
          "Status da compra"?: string | null
          "Status do Pagamento"?: string | null
          Telefone?: number | null
          "Valor da compra"?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Relationships: []
      }
      "Link voz": {
        Row: {
          funil: string | null
          id: number
          "link 1": string | null
          "Link 2": string | null
          "Link 3": string | null
          "tag 1": string | null
          "tag 2": string | null
          "tag 3": string | null
          voz_nome: string | null
        }
        Insert: {
          funil?: string | null
          id?: number
          "link 1"?: string | null
          "Link 2"?: string | null
          "Link 3"?: string | null
          "tag 1"?: string | null
          "tag 2"?: string | null
          "tag 3"?: string | null
          voz_nome?: string | null
        }
        Update: {
          funil?: string | null
          id?: number
          "link 1"?: string | null
          "Link 2"?: string | null
          "Link 3"?: string | null
          "tag 1"?: string | null
          "tag 2"?: string | null
          "tag 3"?: string | null
          voz_nome?: string | null
        }
        Relationships: []
      }
      Login_saas: {
        Row: {
          company_name: string | null
          created_at: string
          email: string | null
          id: number
          senha: string | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: number
          senha?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: number
          senha?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Relationships: []
      }
      "Março | Cadastro Bruno": {
        Row: {
          ConversionApp: string | null
          conversionData: string | null
          conversionSource: string | null
          created_at: string
          CtwaClid: string | null
          Genero_parente: string | null
          id: string
          mediaType: string | null
          mediaUrl: string | null
          name: string | null
          phone: string | null
          recipentTimestamp: string | null
          recipientKeyHash: string | null
          source: string | null
          sourceId: string | null
          sourceType: string | null
          sourceUrl: string | null
          "Status Facebook": string | null
          thumbnail: string | null
          title: string | null
          Vendedor: string | null
        }
        Insert: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          Genero_parente?: string | null
          id: string
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
          Vendedor?: string | null
        }
        Update: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          Genero_parente?: string | null
          id?: string
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
          Vendedor?: string | null
        }
        Relationships: []
      }
      "Março | Facebook_anuncio": {
        Row: {
          ad_id: string | null
          Alcance: string | null
          Cliques_no_Link: string | null
          Cliques_Todos: string | null
          conjunto_nome: string | null
          CPC_Link: string | null
          CPC_Todos: string | null
          CPM: string | null
          CTR_Link: string | null
          CTR_Todos: string | null
          Data: string | null
          data_start: string | null
          data_stop: string | null
          engajamento_post: string | null
          Frequencia: string | null
          ID: string
          Impressao: string | null
          Investimento: string | null
          nome_anuncio: string | null
          nome_campanha: string | null
          Objetivo: string | null
        }
        Insert: {
          ad_id?: string | null
          Alcance?: string | null
          Cliques_no_Link?: string | null
          Cliques_Todos?: string | null
          conjunto_nome?: string | null
          CPC_Link?: string | null
          CPC_Todos?: string | null
          CPM?: string | null
          CTR_Link?: string | null
          CTR_Todos?: string | null
          Data?: string | null
          data_start?: string | null
          data_stop?: string | null
          engajamento_post?: string | null
          Frequencia?: string | null
          ID: string
          Impressao?: string | null
          Investimento?: string | null
          nome_anuncio?: string | null
          nome_campanha?: string | null
          Objetivo?: string | null
        }
        Update: {
          ad_id?: string | null
          Alcance?: string | null
          Cliques_no_Link?: string | null
          Cliques_Todos?: string | null
          conjunto_nome?: string | null
          CPC_Link?: string | null
          CPC_Todos?: string | null
          CPM?: string | null
          CTR_Link?: string | null
          CTR_Todos?: string | null
          Data?: string | null
          data_start?: string | null
          data_stop?: string | null
          engajamento_post?: string | null
          Frequencia?: string | null
          ID?: string
          Impressao?: string | null
          Investimento?: string | null
          nome_anuncio?: string | null
          nome_campanha?: string | null
          Objetivo?: string | null
        }
        Relationships: []
      }
      "Março | FUNIL Bruno": {
        Row: {
          conversation_id: number
          created_at: string | null
          ESTADO_CONVERSA: string | null
          funil: string | null
          HISTORICO_CONVERSA: string | null
          id: string
          "Medicamentos Extração": string | null
          "Nome extração": string | null
          Outros_problemas: string | null
          phone: string | null
          Remarketing: string | null
          "Sintomas Extração": string | null
          "Tempo problema Extração": string | null
          Time_is_active: boolean | null
          ULTIMA_INTERACAO_CLIENTE: string | null
          "Ultimo remarketing data": string | null
          vendedor: string | null
        }
        Insert: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id: string
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
          vendedor?: string | null
        }
        Update: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: string
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Março | FUNIL Bruno_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "Março | Cadastro Bruno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Março | FUNIL Bruno_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "Selecao_Combinada_View"
            referencedColumns: ["cadastro_id"]
          },
        ]
      }
      "Março | Menssagem Bruno": {
        Row: {
          base64_midia: string | null
          conversation_id: string | null
          created_at: string
          foi_lida: boolean | null
          id: number
          message_content: string | null
          miniatura: string | null
          nome_remente: string | null
          status: string | null
          tipo_mensagem: string | null
          url_midia: string | null
          whatsapp_id_mensagem: string | null
        }
        Insert: {
          base64_midia?: string | null
          conversation_id?: string | null
          created_at?: string
          foi_lida?: boolean | null
          id?: number
          message_content?: string | null
          miniatura?: string | null
          nome_remente?: string | null
          status?: string | null
          tipo_mensagem?: string | null
          url_midia?: string | null
          whatsapp_id_mensagem?: string | null
        }
        Update: {
          base64_midia?: string | null
          conversation_id?: string | null
          created_at?: string
          foi_lida?: boolean | null
          id?: number
          message_content?: string | null
          miniatura?: string | null
          nome_remente?: string | null
          status?: string | null
          tipo_mensagem?: string | null
          url_midia?: string | null
          whatsapp_id_mensagem?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Março | Menssagem Bruno_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "Março | Cadastro Bruno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Março | Menssagem Bruno_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "Selecao_Combinada_View"
            referencedColumns: ["cadastro_id"]
          },
        ]
      }
      "Março | Quebra de Objeção Bruno": {
        Row: {
          "Boleto parcelado": boolean | null
          compra_condicionada_a_pagamento: string | null
          compra_futura_planejada: string | null
          compra_imediata: string | null
          confiabilidade_autenticidade_do_produto: string | null
          confiabilidade_garantias_e_devolucoes: string | null
          confiabilidade_legitimidade_da_empresa: string | null
          confiabilidade_verificacao_do_atendimento: string | null
          consulta_familiar: string | null
          consulta_profissional: string | null
          CONTEXTO: string
          created_at: string
          "Efeito Colateral": boolean | null
          "eu não sou médico": boolean | null
          "Falar com a Familia": boolean | null
          financeiro_comparacao_de_precos: string | null
          financeiro_falta_de_recursos: string | null
          financeiro_pedido_de_desconto: string | null
          financeiro_preco_alto: string | null
          "Frete Gratis": boolean | null
          id: string
          "logisticas/operacionais_area_de_cobertura": string | null
          "logisticas/operacionais_detalhes_de_pagamento": string | null
          "logisticas/operacionais_metodos_de_envio": string | null
          "logisticas/operacionais_prazo_de_entrega": string | null
          "Não tenho dinheiro": boolean | null
          "Nome do Produto": boolean | null
          "o cartão virar": boolean | null
          "O tratamento e chá?": boolean | null
          pesquisa_adicional: string | null
          "Posso tomar com outros medicamentos?": boolean | null
          preferencia_metodo_pagamento: string | null
          "Previsão de entrega  antes": boolean | null
          "produto/servico_composicao_Ingredientes": string | null
          "produto/servico_contraindicacoes_seguranca": string | null
          "produto/servico_eficacia_funcionamento": string | null
          "produto/servico_especificacoes_tecnicas": string | null
          "produto/servico_nome_do_produto_Identificacao": string | null
          "Qual o preço?": boolean | null
          Robo: boolean | null
          vendedor: string | null
        }
        Insert: {
          "Boleto parcelado"?: boolean | null
          compra_condicionada_a_pagamento?: string | null
          compra_futura_planejada?: string | null
          compra_imediata?: string | null
          confiabilidade_autenticidade_do_produto?: string | null
          confiabilidade_garantias_e_devolucoes?: string | null
          confiabilidade_legitimidade_da_empresa?: string | null
          confiabilidade_verificacao_do_atendimento?: string | null
          consulta_familiar?: string | null
          consulta_profissional?: string | null
          CONTEXTO: string
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          financeiro_comparacao_de_precos?: string | null
          financeiro_falta_de_recursos?: string | null
          financeiro_pedido_de_desconto?: string | null
          financeiro_preco_alto?: string | null
          "Frete Gratis"?: boolean | null
          id: string
          "logisticas/operacionais_area_de_cobertura"?: string | null
          "logisticas/operacionais_detalhes_de_pagamento"?: string | null
          "logisticas/operacionais_metodos_de_envio"?: string | null
          "logisticas/operacionais_prazo_de_entrega"?: string | null
          "Não tenho dinheiro"?: boolean | null
          "Nome do Produto"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          pesquisa_adicional?: string | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          preferencia_metodo_pagamento?: string | null
          "Previsão de entrega  antes"?: boolean | null
          "produto/servico_composicao_Ingredientes"?: string | null
          "produto/servico_contraindicacoes_seguranca"?: string | null
          "produto/servico_eficacia_funcionamento"?: string | null
          "produto/servico_especificacoes_tecnicas"?: string | null
          "produto/servico_nome_do_produto_Identificacao"?: string | null
          "Qual o preço?"?: boolean | null
          Robo?: boolean | null
          vendedor?: string | null
        }
        Update: {
          "Boleto parcelado"?: boolean | null
          compra_condicionada_a_pagamento?: string | null
          compra_futura_planejada?: string | null
          compra_imediata?: string | null
          confiabilidade_autenticidade_do_produto?: string | null
          confiabilidade_garantias_e_devolucoes?: string | null
          confiabilidade_legitimidade_da_empresa?: string | null
          confiabilidade_verificacao_do_atendimento?: string | null
          consulta_familiar?: string | null
          consulta_profissional?: string | null
          CONTEXTO?: string
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          financeiro_comparacao_de_precos?: string | null
          financeiro_falta_de_recursos?: string | null
          financeiro_pedido_de_desconto?: string | null
          financeiro_preco_alto?: string | null
          "Frete Gratis"?: boolean | null
          id?: string
          "logisticas/operacionais_area_de_cobertura"?: string | null
          "logisticas/operacionais_detalhes_de_pagamento"?: string | null
          "logisticas/operacionais_metodos_de_envio"?: string | null
          "logisticas/operacionais_prazo_de_entrega"?: string | null
          "Não tenho dinheiro"?: boolean | null
          "Nome do Produto"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          pesquisa_adicional?: string | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          preferencia_metodo_pagamento?: string | null
          "Previsão de entrega  antes"?: boolean | null
          "produto/servico_composicao_Ingredientes"?: string | null
          "produto/servico_contraindicacoes_seguranca"?: string | null
          "produto/servico_eficacia_funcionamento"?: string | null
          "produto/servico_especificacoes_tecnicas"?: string | null
          "produto/servico_nome_do_produto_Identificacao"?: string | null
          "Qual o preço?"?: boolean | null
          Robo?: boolean | null
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Março | Quebra de Objeção Bruno_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "Março | Cadastro Bruno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Março | Quebra de Objeção Bruno_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "Selecao_Combinada_View"
            referencedColumns: ["cadastro_id"]
          },
        ]
      }
      messages: {
        Row: {
          conversation_id: number | null
          created_at: string
          id: number
          message_content: string | null
          role: string | null
          status: string | null
        }
        Insert: {
          conversation_id?: number | null
          created_at?: string
          id?: number
          message_content?: string | null
          role?: string | null
          status?: string | null
        }
        Update: {
          conversation_id?: number | null
          created_at?: string
          id?: number
          message_content?: string | null
          role?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messages_Bruno2: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: number
          message_content: string | null
          status: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: number
          message_content?: string | null
          status?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: number
          message_content?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_Bruno2_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations_Bruno2"
            referencedColumns: ["id"]
          },
        ]
      }
      "Quebra de Objeção": {
        Row: {
          "Boleto parcelado": boolean | null
          created_at: string
          "Efeito Colateral": boolean | null
          "eu não sou médico": boolean | null
          "Falar com a Familia": boolean | null
          "Frete Gratis": boolean | null
          id: string
          "Não tenho dinheiro": boolean | null
          "o cartão virar": boolean | null
          "O tratamento e chá?": boolean | null
          "Posso tomar com outros medicamentos?": boolean | null
          "Previsão de entrega  antes": boolean | null
          "Previsão de entrega  depois": boolean | null
          "Qual o preço?": boolean | null
          user_id: string
        }
        Insert: {
          "Boleto parcelado"?: boolean | null
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          "Frete Gratis"?: boolean | null
          id: string
          "Não tenho dinheiro"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          "Previsão de entrega  antes"?: boolean | null
          "Previsão de entrega  depois"?: boolean | null
          "Qual o preço?"?: boolean | null
          user_id: string
        }
        Update: {
          "Boleto parcelado"?: boolean | null
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          "Frete Gratis"?: boolean | null
          id?: string
          "Não tenho dinheiro"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          "Previsão de entrega  antes"?: boolean | null
          "Previsão de entrega  depois"?: boolean | null
          "Qual o preço?"?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      "Quebra de Objeção BRUNO2": {
        Row: {
          "Boleto parcelado": boolean | null
          CONTEXTO: string
          created_at: string
          "Efeito Colateral": boolean | null
          "eu não sou médico": boolean | null
          "Falar com a Familia": boolean | null
          "Frete Gratis": boolean | null
          id: string
          "Não tenho dinheiro": boolean | null
          "o cartão virar": boolean | null
          "O tratamento e chá?": boolean | null
          "Posso tomar com outros medicamentos?": boolean | null
          "Previsão de entrega  antes": boolean | null
          "Qual o preço?": boolean | null
          Robo: boolean | null
        }
        Insert: {
          "Boleto parcelado"?: boolean | null
          CONTEXTO: string
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          "Frete Gratis"?: boolean | null
          id: string
          "Não tenho dinheiro"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          "Previsão de entrega  antes"?: boolean | null
          "Qual o preço?"?: boolean | null
          Robo?: boolean | null
        }
        Update: {
          "Boleto parcelado"?: boolean | null
          CONTEXTO?: string
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          "Frete Gratis"?: boolean | null
          id?: string
          "Não tenho dinheiro"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          "Previsão de entrega  antes"?: boolean | null
          "Qual o preço?"?: boolean | null
          Robo?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Quebra de Objeção BRUNO2_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users_Bruno2"
            referencedColumns: ["id"]
          },
        ]
      }
      SAAS_usuarios: {
        Row: {
          ativo: boolean | null
          braip_ativo: boolean | null
          braip_token: string | null
          braip_webhook_url: string | null
          cnpj: string | null
          config_funil: Json | null
          config_notificacoes: Json | null
          config_remarketing: Json | null
          configuracoes_extras: Json | null
          data_alteracao: string | null
          data_criacao: string | null
          email: string
          endereco_empresa: string | null
          facebook_app_id: string | null
          facebook_ativo: boolean | null
          facebook_pixel_id: string | null
          facebook_token_api: string | null
          facebook_token_pagina: string | null
          facebook_token_usuario: string | null
          google_sheets_ativo: boolean | null
          google_sheets_id_planilha: string | null
          google_sheets_token: string | null
          id: number
          keed_ativo: boolean | null
          keed_token: string | null
          keed_webhook_url: string | null
          leads_processados_mes: number | null
          limite_leads_simultaneos: number | null
          metadados: Json | null
          n8n_webhook_url: string | null
          nome_empresa: string | null
          nome_usuario: string
          openai_assistente_id: string | null
          openai_ativo: boolean | null
          openai_modelo_preferido: string | null
          openai_token: string | null
          payt_ativo: boolean | null
          payt_token: string | null
          payt_webhook_url: string | null
          produto_principal: string | null
          produtos_ativos: string[] | null
          receita_mes: number | null
          senha_hash: string
          supabase_anon_key: string | null
          supabase_url: string | null
          telefone_empresa: string | null
          tipo_usuario: string | null
          ultimo_acesso: string | null
          vendas_realizadas_mes: number | null
          whatsapp_api_key: string | null
          whatsapp_instancia: string | null
          whatsapp_nome_perfil: string | null
          whatsapp_numero: string | null
          whatsapp_status: string | null
          whatsapp_url_servidor: string | null
          whatsapp_webhook_conectado: boolean | null
          whatsapp_webhook_url: string | null
        }
        Insert: {
          ativo?: boolean | null
          braip_ativo?: boolean | null
          braip_token?: string | null
          braip_webhook_url?: string | null
          cnpj?: string | null
          config_funil?: Json | null
          config_notificacoes?: Json | null
          config_remarketing?: Json | null
          configuracoes_extras?: Json | null
          data_alteracao?: string | null
          data_criacao?: string | null
          email: string
          endereco_empresa?: string | null
          facebook_app_id?: string | null
          facebook_ativo?: boolean | null
          facebook_pixel_id?: string | null
          facebook_token_api?: string | null
          facebook_token_pagina?: string | null
          facebook_token_usuario?: string | null
          google_sheets_ativo?: boolean | null
          google_sheets_id_planilha?: string | null
          google_sheets_token?: string | null
          id: number
          keed_ativo?: boolean | null
          keed_token?: string | null
          keed_webhook_url?: string | null
          leads_processados_mes?: number | null
          limite_leads_simultaneos?: number | null
          metadados?: Json | null
          n8n_webhook_url?: string | null
          nome_empresa?: string | null
          nome_usuario: string
          openai_assistente_id?: string | null
          openai_ativo?: boolean | null
          openai_modelo_preferido?: string | null
          openai_token?: string | null
          payt_ativo?: boolean | null
          payt_token?: string | null
          payt_webhook_url?: string | null
          produto_principal?: string | null
          produtos_ativos?: string[] | null
          receita_mes?: number | null
          senha_hash: string
          supabase_anon_key?: string | null
          supabase_url?: string | null
          telefone_empresa?: string | null
          tipo_usuario?: string | null
          ultimo_acesso?: string | null
          vendas_realizadas_mes?: number | null
          whatsapp_api_key?: string | null
          whatsapp_instancia?: string | null
          whatsapp_nome_perfil?: string | null
          whatsapp_numero?: string | null
          whatsapp_status?: string | null
          whatsapp_url_servidor?: string | null
          whatsapp_webhook_conectado?: boolean | null
          whatsapp_webhook_url?: string | null
        }
        Update: {
          ativo?: boolean | null
          braip_ativo?: boolean | null
          braip_token?: string | null
          braip_webhook_url?: string | null
          cnpj?: string | null
          config_funil?: Json | null
          config_notificacoes?: Json | null
          config_remarketing?: Json | null
          configuracoes_extras?: Json | null
          data_alteracao?: string | null
          data_criacao?: string | null
          email?: string
          endereco_empresa?: string | null
          facebook_app_id?: string | null
          facebook_ativo?: boolean | null
          facebook_pixel_id?: string | null
          facebook_token_api?: string | null
          facebook_token_pagina?: string | null
          facebook_token_usuario?: string | null
          google_sheets_ativo?: boolean | null
          google_sheets_id_planilha?: string | null
          google_sheets_token?: string | null
          id?: number
          keed_ativo?: boolean | null
          keed_token?: string | null
          keed_webhook_url?: string | null
          leads_processados_mes?: number | null
          limite_leads_simultaneos?: number | null
          metadados?: Json | null
          n8n_webhook_url?: string | null
          nome_empresa?: string | null
          nome_usuario?: string
          openai_assistente_id?: string | null
          openai_ativo?: boolean | null
          openai_modelo_preferido?: string | null
          openai_token?: string | null
          payt_ativo?: boolean | null
          payt_token?: string | null
          payt_webhook_url?: string | null
          produto_principal?: string | null
          produtos_ativos?: string[] | null
          receita_mes?: number | null
          senha_hash?: string
          supabase_anon_key?: string | null
          supabase_url?: string | null
          telefone_empresa?: string | null
          tipo_usuario?: string | null
          ultimo_acesso?: string | null
          vendas_realizadas_mes?: number | null
          whatsapp_api_key?: string | null
          whatsapp_instancia?: string | null
          whatsapp_nome_perfil?: string | null
          whatsapp_numero?: string | null
          whatsapp_status?: string | null
          whatsapp_url_servidor?: string | null
          whatsapp_webhook_conectado?: boolean | null
          whatsapp_webhook_url?: string | null
        }
        Relationships: []
      }
      sistema_usuarios: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          criado_em: string | null
          criado_por: string | null
          email: string
          id: string
          nome: string
          role: Database["public"]["Enums"]["user_role"]
          senha_hash: string
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          criado_por?: string | null
          email: string
          id?: string
          nome: string
          role?: Database["public"]["Enums"]["user_role"]
          senha_hash: string
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          criado_por?: string | null
          email?: string
          id?: string
          nome?: string
          role?: Database["public"]["Enums"]["user_role"]
          senha_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "sistema_usuarios_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "sistema_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      TESTE: {
        Row: {
          Boleto: boolean | null
          "Dúvida sobre chá": boolean | null
          "Efeitos colaterais": boolean | null
          "Esperar o cartão virar": boolean | null
          "Eu não sou Robô": boolean | null
          Família: boolean | null
          Frete: boolean | null
          funil: string | null
          HISTORICO_CONVERSA: string | null
          id: number
          Medicamentos: boolean | null
          Médico: boolean | null
          "Não tenho dinheiro": boolean | null
          "Prazo entrega": boolean | null
          Preço: boolean | null
          "TESTE 1": string
          "versão do teste": string | null
        }
        Insert: {
          Boleto?: boolean | null
          "Dúvida sobre chá"?: boolean | null
          "Efeitos colaterais"?: boolean | null
          "Esperar o cartão virar"?: boolean | null
          "Eu não sou Robô"?: boolean | null
          Família?: boolean | null
          Frete?: boolean | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          Medicamentos?: boolean | null
          Médico?: boolean | null
          "Não tenho dinheiro"?: boolean | null
          "Prazo entrega"?: boolean | null
          Preço?: boolean | null
          "TESTE 1": string
          "versão do teste"?: string | null
        }
        Update: {
          Boleto?: boolean | null
          "Dúvida sobre chá"?: boolean | null
          "Efeitos colaterais"?: boolean | null
          "Esperar o cartão virar"?: boolean | null
          "Eu não sou Robô"?: boolean | null
          Família?: boolean | null
          Frete?: boolean | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: number
          Medicamentos?: boolean | null
          Médico?: boolean | null
          "Não tenho dinheiro"?: boolean | null
          "Prazo entrega"?: boolean | null
          Preço?: boolean | null
          "TESTE 1"?: string
          "versão do teste"?: string | null
        }
        Relationships: []
      }
      TESTE_bruno2: {
        Row: {
          Boleto: boolean | null
          "Dúvida sobre chá": boolean | null
          "Efeitos colaterais": boolean | null
          "Esperar o cartão virar": boolean | null
          "Eu não sou Robô": boolean | null
          Família: boolean | null
          Frete: boolean | null
          funil: string | null
          HISTORICO_CONVERSA: string | null
          id: string
          Medicamentos: boolean | null
          Médico: boolean | null
          "Não tenho dinheiro": boolean | null
          "Prazo entrega": boolean | null
          Preço: boolean | null
          "TESTE 1": string
          "versão do teste": string | null
        }
        Insert: {
          Boleto?: boolean | null
          "Dúvida sobre chá"?: boolean | null
          "Efeitos colaterais"?: boolean | null
          "Esperar o cartão virar"?: boolean | null
          "Eu não sou Robô"?: boolean | null
          Família?: boolean | null
          Frete?: boolean | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id: string
          Medicamentos?: boolean | null
          Médico?: boolean | null
          "Não tenho dinheiro"?: boolean | null
          "Prazo entrega"?: boolean | null
          Preço?: boolean | null
          "TESTE 1": string
          "versão do teste"?: string | null
        }
        Update: {
          Boleto?: boolean | null
          "Dúvida sobre chá"?: boolean | null
          "Efeitos colaterais"?: boolean | null
          "Esperar o cartão virar"?: boolean | null
          "Eu não sou Robô"?: boolean | null
          Família?: boolean | null
          Frete?: boolean | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: string
          Medicamentos?: boolean | null
          Médico?: boolean | null
          "Não tenho dinheiro"?: boolean | null
          "Prazo entrega"?: boolean | null
          Preço?: boolean | null
          "TESTE 1"?: string
          "versão do teste"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "TESTE_bruno2_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users_Bruno2"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          ConversionApp: string | null
          conversionData: string | null
          conversionSource: string | null
          created_at: string
          CtwaClid: string | null
          id: number
          mediaType: string | null
          mediaUrl: string | null
          name: string | null
          phone: string | null
          recipentTimestamp: string | null
          recipientKeyHash: string | null
          source: string | null
          sourceId: string | null
          sourceType: string | null
          sourceUrl: string | null
          "Status Facebook": string | null
          thumbnail: string | null
          title: string | null
        }
        Insert: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          id?: number
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
        }
        Update: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          id?: number
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
        }
        Relationships: []
      }
      users_Bruno2: {
        Row: {
          ConversionApp: string | null
          conversionData: string | null
          conversionSource: string | null
          created_at: string
          CtwaClid: string | null
          id: string
          mediaType: string | null
          mediaUrl: string | null
          name: string | null
          phone: string | null
          recipentTimestamp: string | null
          recipientKeyHash: string | null
          source: string | null
          sourceId: string | null
          sourceType: string | null
          sourceUrl: string | null
          "Status Facebook": string | null
          thumbnail: string | null
          title: string | null
        }
        Insert: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          id: string
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
        }
        Update: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          id?: string
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
        }
        Relationships: []
      }
      vendas_rmgi: {
        Row: {
          bairro: string | null
          Cadastro_ConversionApp: string | null
          Cadastro_conversionData: string | null
          Cadastro_conversionSource: string | null
          Cadastro_created_at: string | null
          Cadastro_CtwaClid: string | null
          Cadastro_Id: string | null
          Cadastro_mediaType: string | null
          Cadastro_mediaUrl: string | null
          Cadastro_Nome: string | null
          Cadastro_recipentTimestamp: string | null
          Cadastro_recipientKeyHash: string | null
          Cadastro_source: string | null
          Cadastro_sourceId: string | null
          Cadastro_sourceType: string | null
          Cadastro_sourceUrl: string | null
          Cadastro_Status_Facebook: string | null
          Cadastro_thumbnail: string | null
          Cep_do_Cliente: string
          Cidade_do_Cliente: string | null
          Codigo_da_compra: string | null
          Codigo_Rastreio: string | null
          Comissao: string | null
          Complemento_do_Cliente: string | null
          CPF_do_cliente: string | null
          Data_da_alteracao: string | null
          Data_da_criacao: string | null
          Email_do_Cliente: string | null
          Endereco_Rua_Av: string | null
          Estado_do_Cliente: string | null
          Forma_de_pagamento: string | null
          id: string
          Nome_do_Cliente: string | null
          Numero_casa: string | null
          Pay_on_Delivery: string | null
          plano_de_tratamento: string | null
          Plataforma_de_venda: string | null
          Produto: string | null
          Status_da_compra: string | null
          Status_do_Pagamento: string | null
          "Tag meta": string | null
          Telefone: number | null
          Tipo_do_frete: string | null
          upsell: string | null
          Valor_da_compra: string | null
          Valor_do_frete: string | null
          Vendedor: string | null
          Vendedor_email: string | null
          Vendedor_numero: number | null
        }
        Insert: {
          bairro?: string | null
          Cadastro_ConversionApp?: string | null
          Cadastro_conversionData?: string | null
          Cadastro_conversionSource?: string | null
          Cadastro_created_at?: string | null
          Cadastro_CtwaClid?: string | null
          Cadastro_Id?: string | null
          Cadastro_mediaType?: string | null
          Cadastro_mediaUrl?: string | null
          Cadastro_Nome?: string | null
          Cadastro_recipentTimestamp?: string | null
          Cadastro_recipientKeyHash?: string | null
          Cadastro_source?: string | null
          Cadastro_sourceId?: string | null
          Cadastro_sourceType?: string | null
          Cadastro_sourceUrl?: string | null
          Cadastro_Status_Facebook?: string | null
          Cadastro_thumbnail?: string | null
          Cep_do_Cliente: string
          Cidade_do_Cliente?: string | null
          Codigo_da_compra?: string | null
          Codigo_Rastreio?: string | null
          Comissao?: string | null
          Complemento_do_Cliente?: string | null
          CPF_do_cliente?: string | null
          Data_da_alteracao?: string | null
          Data_da_criacao?: string | null
          Email_do_Cliente?: string | null
          Endereco_Rua_Av?: string | null
          Estado_do_Cliente?: string | null
          Forma_de_pagamento?: string | null
          id: string
          Nome_do_Cliente?: string | null
          Numero_casa?: string | null
          Pay_on_Delivery?: string | null
          plano_de_tratamento?: string | null
          Plataforma_de_venda?: string | null
          Produto?: string | null
          Status_da_compra?: string | null
          Status_do_Pagamento?: string | null
          "Tag meta"?: string | null
          Telefone?: number | null
          Tipo_do_frete?: string | null
          upsell?: string | null
          Valor_da_compra?: string | null
          Valor_do_frete?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Update: {
          bairro?: string | null
          Cadastro_ConversionApp?: string | null
          Cadastro_conversionData?: string | null
          Cadastro_conversionSource?: string | null
          Cadastro_created_at?: string | null
          Cadastro_CtwaClid?: string | null
          Cadastro_Id?: string | null
          Cadastro_mediaType?: string | null
          Cadastro_mediaUrl?: string | null
          Cadastro_Nome?: string | null
          Cadastro_recipentTimestamp?: string | null
          Cadastro_recipientKeyHash?: string | null
          Cadastro_source?: string | null
          Cadastro_sourceId?: string | null
          Cadastro_sourceType?: string | null
          Cadastro_sourceUrl?: string | null
          Cadastro_Status_Facebook?: string | null
          Cadastro_thumbnail?: string | null
          Cep_do_Cliente?: string
          Cidade_do_Cliente?: string | null
          Codigo_da_compra?: string | null
          Codigo_Rastreio?: string | null
          Comissao?: string | null
          Complemento_do_Cliente?: string | null
          CPF_do_cliente?: string | null
          Data_da_alteracao?: string | null
          Data_da_criacao?: string | null
          Email_do_Cliente?: string | null
          Endereco_Rua_Av?: string | null
          Estado_do_Cliente?: string | null
          Forma_de_pagamento?: string | null
          id?: string
          Nome_do_Cliente?: string | null
          Numero_casa?: string | null
          Pay_on_Delivery?: string | null
          plano_de_tratamento?: string | null
          Plataforma_de_venda?: string | null
          Produto?: string | null
          Status_da_compra?: string | null
          Status_do_Pagamento?: string | null
          "Tag meta"?: string | null
          Telefone?: number | null
          Tipo_do_frete?: string | null
          upsell?: string | null
          Valor_da_compra?: string | null
          Valor_do_frete?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Relationships: []
      }
      vendas_vendedor1: {
        Row: {
          bairro: string | null
          Cadastro_ConversionApp: string | null
          Cadastro_conversionData: string | null
          Cadastro_conversionSource: string | null
          Cadastro_created_at: string | null
          Cadastro_CtwaClid: string | null
          Cadastro_Id: string | null
          Cadastro_mediaType: string | null
          Cadastro_mediaUrl: string | null
          Cadastro_Nome: string | null
          Cadastro_recipentTimestamp: string | null
          Cadastro_recipientKeyHash: string | null
          Cadastro_source: string | null
          Cadastro_sourceId: string | null
          Cadastro_sourceType: string | null
          Cadastro_sourceUrl: string | null
          Cadastro_Status_Facebook: string | null
          Cadastro_thumbnail: string | null
          Cep_do_Cliente: string
          Cidade_do_Cliente: string | null
          Codigo_da_compra: string | null
          Codigo_Rastreio: string | null
          Comissão: string | null
          Complemento_do_Cliente: string | null
          CPF_do_cliente: string | null
          Data_da_alteracao: string | null
          Data_da_criacao: string | null
          Email_do_Cliente: string | null
          Endereco_Rua_Av: string | null
          Estado_do_Cliente: string | null
          Forma_de_pagamento: string | null
          id: string
          Nome_do_Cliente: string | null
          Numero_casa: string | null
          Pay_on_Delivery: string | null
          plano_de_tratamento: string | null
          Plataforma_de_venda: string | null
          Produto: string | null
          Status_da_compra: string | null
          Status_do_Pagamento: string | null
          "Tag meta": string | null
          Telefone: number | null
          Tipo_do_frete: string | null
          upsell: string | null
          Valor_da_compra: string | null
          Valor_do_frete: string | null
          Vendedor: string | null
          Vendedor_email: string | null
          Vendedor_numero: number | null
        }
        Insert: {
          bairro?: string | null
          Cadastro_ConversionApp?: string | null
          Cadastro_conversionData?: string | null
          Cadastro_conversionSource?: string | null
          Cadastro_created_at?: string | null
          Cadastro_CtwaClid?: string | null
          Cadastro_Id?: string | null
          Cadastro_mediaType?: string | null
          Cadastro_mediaUrl?: string | null
          Cadastro_Nome?: string | null
          Cadastro_recipentTimestamp?: string | null
          Cadastro_recipientKeyHash?: string | null
          Cadastro_source?: string | null
          Cadastro_sourceId?: string | null
          Cadastro_sourceType?: string | null
          Cadastro_sourceUrl?: string | null
          Cadastro_Status_Facebook?: string | null
          Cadastro_thumbnail?: string | null
          Cep_do_Cliente: string
          Cidade_do_Cliente?: string | null
          Codigo_da_compra?: string | null
          Codigo_Rastreio?: string | null
          Comissão?: string | null
          Complemento_do_Cliente?: string | null
          CPF_do_cliente?: string | null
          Data_da_alteracao?: string | null
          Data_da_criacao?: string | null
          Email_do_Cliente?: string | null
          Endereco_Rua_Av?: string | null
          Estado_do_Cliente?: string | null
          Forma_de_pagamento?: string | null
          id: string
          Nome_do_Cliente?: string | null
          Numero_casa?: string | null
          Pay_on_Delivery?: string | null
          plano_de_tratamento?: string | null
          Plataforma_de_venda?: string | null
          Produto?: string | null
          Status_da_compra?: string | null
          Status_do_Pagamento?: string | null
          "Tag meta"?: string | null
          Telefone?: number | null
          Tipo_do_frete?: string | null
          upsell?: string | null
          Valor_da_compra?: string | null
          Valor_do_frete?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Update: {
          bairro?: string | null
          Cadastro_ConversionApp?: string | null
          Cadastro_conversionData?: string | null
          Cadastro_conversionSource?: string | null
          Cadastro_created_at?: string | null
          Cadastro_CtwaClid?: string | null
          Cadastro_Id?: string | null
          Cadastro_mediaType?: string | null
          Cadastro_mediaUrl?: string | null
          Cadastro_Nome?: string | null
          Cadastro_recipentTimestamp?: string | null
          Cadastro_recipientKeyHash?: string | null
          Cadastro_source?: string | null
          Cadastro_sourceId?: string | null
          Cadastro_sourceType?: string | null
          Cadastro_sourceUrl?: string | null
          Cadastro_Status_Facebook?: string | null
          Cadastro_thumbnail?: string | null
          Cep_do_Cliente?: string
          Cidade_do_Cliente?: string | null
          Codigo_da_compra?: string | null
          Codigo_Rastreio?: string | null
          Comissão?: string | null
          Complemento_do_Cliente?: string | null
          CPF_do_cliente?: string | null
          Data_da_alteracao?: string | null
          Data_da_criacao?: string | null
          Email_do_Cliente?: string | null
          Endereco_Rua_Av?: string | null
          Estado_do_Cliente?: string | null
          Forma_de_pagamento?: string | null
          id?: string
          Nome_do_Cliente?: string | null
          Numero_casa?: string | null
          Pay_on_Delivery?: string | null
          plano_de_tratamento?: string | null
          Plataforma_de_venda?: string | null
          Produto?: string | null
          Status_da_compra?: string | null
          Status_do_Pagamento?: string | null
          "Tag meta"?: string | null
          Telefone?: number | null
          Tipo_do_frete?: string | null
          upsell?: string | null
          Valor_da_compra?: string | null
          Valor_do_frete?: string | null
          Vendedor?: string | null
          Vendedor_email?: string | null
          Vendedor_numero?: number | null
        }
        Relationships: []
      }
      vendedor1_cadastro: {
        Row: {
          ConversionApp: string | null
          conversionData: string | null
          conversionSource: string | null
          created_at: string
          CtwaClid: string | null
          Genero_parente: string | null
          id: string
          mediaType: string | null
          mediaUrl: string | null
          name: string | null
          phone: string | null
          recipentTimestamp: string | null
          recipientKeyHash: string | null
          source: string | null
          sourceId: string | null
          sourceType: string | null
          sourceUrl: string | null
          "Status Facebook": string | null
          thumbnail: string | null
          title: string | null
          Vendedor: string | null
        }
        Insert: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          Genero_parente?: string | null
          id: string
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
          Vendedor?: string | null
        }
        Update: {
          ConversionApp?: string | null
          conversionData?: string | null
          conversionSource?: string | null
          created_at?: string
          CtwaClid?: string | null
          Genero_parente?: string | null
          id?: string
          mediaType?: string | null
          mediaUrl?: string | null
          name?: string | null
          phone?: string | null
          recipentTimestamp?: string | null
          recipientKeyHash?: string | null
          source?: string | null
          sourceId?: string | null
          sourceType?: string | null
          sourceUrl?: string | null
          "Status Facebook"?: string | null
          thumbnail?: string | null
          title?: string | null
          Vendedor?: string | null
        }
        Relationships: []
      }
      vendedor1_facebook_anuncio: {
        Row: {
          ad_id: string | null
          Alcance: string | null
          Cliques_no_Link: string | null
          Cliques_Todos: string | null
          conjunto_nome: string | null
          CPC_Link: string | null
          CPC_Todos: string | null
          CPM: string | null
          CTR_Link: string | null
          CTR_Todos: string | null
          Data: string | null
          data_start: string | null
          data_stop: string | null
          engajamento_post: string | null
          Frequencia: string | null
          ID: string
          Impressao: string | null
          Investimento: string | null
          nome_anuncio: string | null
          nome_campanha: string | null
          Objetivo: string | null
        }
        Insert: {
          ad_id?: string | null
          Alcance?: string | null
          Cliques_no_Link?: string | null
          Cliques_Todos?: string | null
          conjunto_nome?: string | null
          CPC_Link?: string | null
          CPC_Todos?: string | null
          CPM?: string | null
          CTR_Link?: string | null
          CTR_Todos?: string | null
          Data?: string | null
          data_start?: string | null
          data_stop?: string | null
          engajamento_post?: string | null
          Frequencia?: string | null
          ID: string
          Impressao?: string | null
          Investimento?: string | null
          nome_anuncio?: string | null
          nome_campanha?: string | null
          Objetivo?: string | null
        }
        Update: {
          ad_id?: string | null
          Alcance?: string | null
          Cliques_no_Link?: string | null
          Cliques_Todos?: string | null
          conjunto_nome?: string | null
          CPC_Link?: string | null
          CPC_Todos?: string | null
          CPM?: string | null
          CTR_Link?: string | null
          CTR_Todos?: string | null
          Data?: string | null
          data_start?: string | null
          data_stop?: string | null
          engajamento_post?: string | null
          Frequencia?: string | null
          ID?: string
          Impressao?: string | null
          Investimento?: string | null
          nome_anuncio?: string | null
          nome_campanha?: string | null
          Objetivo?: string | null
        }
        Relationships: []
      }
      vendedor1_funil: {
        Row: {
          conversation_id: number
          created_at: string | null
          ESTADO_CONVERSA: string | null
          funil: string | null
          HISTORICO_CONVERSA: string | null
          id: string
          "Medicamentos Extração": string | null
          "Nome extração": string | null
          Outros_problemas: string | null
          phone: string | null
          Remarketing: string | null
          "Sintomas Extração": string | null
          "Tempo problema Extração": string | null
          Time_is_active: boolean | null
          ULTIMA_INTERACAO_CLIENTE: string | null
          "Ultimo remarketing data": string | null
          vendedor: string | null
        }
        Insert: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id: string
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
          vendedor?: string | null
        }
        Update: {
          conversation_id?: number
          created_at?: string | null
          ESTADO_CONVERSA?: string | null
          funil?: string | null
          HISTORICO_CONVERSA?: string | null
          id?: string
          "Medicamentos Extração"?: string | null
          "Nome extração"?: string | null
          Outros_problemas?: string | null
          phone?: string | null
          Remarketing?: string | null
          "Sintomas Extração"?: string | null
          "Tempo problema Extração"?: string | null
          Time_is_active?: boolean | null
          ULTIMA_INTERACAO_CLIENTE?: string | null
          "Ultimo remarketing data"?: string | null
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendedor1_funil_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "dashboard_vendedor1"
            referencedColumns: ["cadastro_id"]
          },
          {
            foreignKeyName: "vendedor1_funil_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "vendedor1_cadastro"
            referencedColumns: ["id"]
          },
        ]
      }
      vendedor1_menssagem: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: number
          message_content: string | null
          status: string | null
          vendedor: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: number
          message_content?: string | null
          status?: string | null
          vendedor?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: number
          message_content?: string | null
          status?: string | null
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendedor1_menssagem_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "dashboard_vendedor1"
            referencedColumns: ["cadastro_id"]
          },
          {
            foreignKeyName: "vendedor1_menssagem_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "vendedor1_cadastro"
            referencedColumns: ["id"]
          },
        ]
      }
      vendedor1_quebra_de_objecao: {
        Row: {
          "Boleto parcelado": boolean | null
          compra_condicionada_a_pagamento: string | null
          compra_futura_planejada: string | null
          compra_imediata: string | null
          confiabilidade_autenticidade_do_produto: string | null
          confiabilidade_garantias_e_devolucoes: string | null
          confiabilidade_legitimidade_da_empresa: string | null
          confiabilidade_verificacao_do_atendimento: string | null
          consulta_familiar: string | null
          consulta_profissional: string | null
          CONTEXTO: string
          created_at: string
          "Efeito Colateral": boolean | null
          "eu não sou médico": boolean | null
          "Falar com a Familia": boolean | null
          financeiro_comparacao_de_precos: string | null
          financeiro_falta_de_recursos: string | null
          financeiro_pedido_de_desconto: string | null
          financeiro_preco_alto: string | null
          "Frete Gratis": boolean | null
          id: string
          "logisticas/operacionais_area_de_cobertura": string | null
          "logisticas/operacionais_detalhes_de_pagamento": string | null
          "logisticas/operacionais_metodos_de_envio": string | null
          "logisticas/operacionais_prazo_de_entrega": string | null
          "Não tenho dinheiro": boolean | null
          "Nome do Produto": boolean | null
          "o cartão virar": boolean | null
          "O tratamento e chá?": boolean | null
          pesquisa_adicional: string | null
          "Posso tomar com outros medicamentos?": boolean | null
          preferencia_metodo_pagamento: string | null
          "Previsão de entrega  antes": boolean | null
          "produto/servico_composicao_Ingredientes": string | null
          "produto/servico_contraindicacoes_seguranca": string | null
          "produto/servico_eficacia_funcionamento": string | null
          "produto/servico_especificacoes_tecnicas": string | null
          "produto/servico_nome_do_produto_Identificacao": string | null
          "Qual o preço?": boolean | null
          Robo: boolean | null
          vendedor: string | null
        }
        Insert: {
          "Boleto parcelado"?: boolean | null
          compra_condicionada_a_pagamento?: string | null
          compra_futura_planejada?: string | null
          compra_imediata?: string | null
          confiabilidade_autenticidade_do_produto?: string | null
          confiabilidade_garantias_e_devolucoes?: string | null
          confiabilidade_legitimidade_da_empresa?: string | null
          confiabilidade_verificacao_do_atendimento?: string | null
          consulta_familiar?: string | null
          consulta_profissional?: string | null
          CONTEXTO: string
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          financeiro_comparacao_de_precos?: string | null
          financeiro_falta_de_recursos?: string | null
          financeiro_pedido_de_desconto?: string | null
          financeiro_preco_alto?: string | null
          "Frete Gratis"?: boolean | null
          id: string
          "logisticas/operacionais_area_de_cobertura"?: string | null
          "logisticas/operacionais_detalhes_de_pagamento"?: string | null
          "logisticas/operacionais_metodos_de_envio"?: string | null
          "logisticas/operacionais_prazo_de_entrega"?: string | null
          "Não tenho dinheiro"?: boolean | null
          "Nome do Produto"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          pesquisa_adicional?: string | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          preferencia_metodo_pagamento?: string | null
          "Previsão de entrega  antes"?: boolean | null
          "produto/servico_composicao_Ingredientes"?: string | null
          "produto/servico_contraindicacoes_seguranca"?: string | null
          "produto/servico_eficacia_funcionamento"?: string | null
          "produto/servico_especificacoes_tecnicas"?: string | null
          "produto/servico_nome_do_produto_Identificacao"?: string | null
          "Qual o preço?"?: boolean | null
          Robo?: boolean | null
          vendedor?: string | null
        }
        Update: {
          "Boleto parcelado"?: boolean | null
          compra_condicionada_a_pagamento?: string | null
          compra_futura_planejada?: string | null
          compra_imediata?: string | null
          confiabilidade_autenticidade_do_produto?: string | null
          confiabilidade_garantias_e_devolucoes?: string | null
          confiabilidade_legitimidade_da_empresa?: string | null
          confiabilidade_verificacao_do_atendimento?: string | null
          consulta_familiar?: string | null
          consulta_profissional?: string | null
          CONTEXTO?: string
          created_at?: string
          "Efeito Colateral"?: boolean | null
          "eu não sou médico"?: boolean | null
          "Falar com a Familia"?: boolean | null
          financeiro_comparacao_de_precos?: string | null
          financeiro_falta_de_recursos?: string | null
          financeiro_pedido_de_desconto?: string | null
          financeiro_preco_alto?: string | null
          "Frete Gratis"?: boolean | null
          id?: string
          "logisticas/operacionais_area_de_cobertura"?: string | null
          "logisticas/operacionais_detalhes_de_pagamento"?: string | null
          "logisticas/operacionais_metodos_de_envio"?: string | null
          "logisticas/operacionais_prazo_de_entrega"?: string | null
          "Não tenho dinheiro"?: boolean | null
          "Nome do Produto"?: boolean | null
          "o cartão virar"?: boolean | null
          "O tratamento e chá?"?: boolean | null
          pesquisa_adicional?: string | null
          "Posso tomar com outros medicamentos?"?: boolean | null
          preferencia_metodo_pagamento?: string | null
          "Previsão de entrega  antes"?: boolean | null
          "produto/servico_composicao_Ingredientes"?: string | null
          "produto/servico_contraindicacoes_seguranca"?: string | null
          "produto/servico_eficacia_funcionamento"?: string | null
          "produto/servico_especificacoes_tecnicas"?: string | null
          "produto/servico_nome_do_produto_Identificacao"?: string | null
          "Qual o preço?"?: boolean | null
          Robo?: boolean | null
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendedor1_quebra_de_objecao_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "dashboard_vendedor1"
            referencedColumns: ["cadastro_id"]
          },
          {
            foreignKeyName: "vendedor1_quebra_de_objecao_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "vendedor1_cadastro"
            referencedColumns: ["id"]
          },
        ]
      }
      wrappers_fdw_stats: {
        Row: {
          bytes_in: number | null
          bytes_out: number | null
          create_times: number | null
          created_at: string
          fdw_name: string
          metadata: Json | null
          rows_in: number | null
          rows_out: number | null
          updated_at: string
        }
        Insert: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Update: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name?: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      dashboard_vendedor1: {
        Row: {
          cadastro_created_at: string | null
          cadastro_id: string | null
          cadastro_phone: string | null
          cadastro_sourceid: string | null
          facebook_ad_id: string | null
          facebook_alcance: string | null
          facebook_cliques_no_link: string | null
          facebook_cliques_todos: string | null
          facebook_conjunto_nome: string | null
          facebook_cpc_link: string | null
          facebook_cpc_todos: string | null
          facebook_cpm: string | null
          facebook_ctr_link: string | null
          facebook_ctr_todos: string | null
          facebook_data: string | null
          facebook_data_start: string | null
          facebook_data_stop: string | null
          facebook_engajamento_post: string | null
          facebook_frequencia: string | null
          facebook_id: string | null
          facebook_impressao: string | null
          facebook_investimento: string | null
          facebook_nome_anuncio: string | null
          facebook_nome_campanha: string | null
          facebook_objetivo: string | null
          funil_created_at: string | null
          funil_id: string | null
          funil_status: string | null
          venda_cliente: string | null
          venda_codigo: string | null
          venda_data: string | null
          venda_id: string | null
          venda_status: string | null
          venda_telefone: number | null
          venda_valor: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendedor1_funil_id_fkey"
            columns: ["funil_id"]
            isOneToOne: true
            referencedRelation: "dashboard_vendedor1"
            referencedColumns: ["cadastro_id"]
          },
          {
            foreignKeyName: "vendedor1_funil_id_fkey"
            columns: ["funil_id"]
            isOneToOne: true
            referencedRelation: "vendedor1_cadastro"
            referencedColumns: ["id"]
          },
        ]
      }
      Selecao_Combinada_View: {
        Row: {
          cadastro_created_at: string | null
          cadastro_id: string | null
          cadastro_phone: string | null
          cadastro_sourceid: string | null
          facebook_ad_id: string | null
          facebook_alcance: string | null
          facebook_cliques_no_link: string | null
          facebook_cliques_todos: string | null
          facebook_conjunto_nome: string | null
          facebook_cpc_link: string | null
          facebook_cpc_todos: string | null
          facebook_cpm: string | null
          facebook_ctr_link: string | null
          facebook_ctr_todos: string | null
          facebook_data: string | null
          facebook_data_start: string | null
          facebook_data_stop: string | null
          facebook_engajamento_post: string | null
          facebook_frequencia: string | null
          facebook_id: string | null
          facebook_impressao: string | null
          facebook_investimento: string | null
          facebook_nome_anuncio: string | null
          facebook_nome_campanha: string | null
          facebook_objetivo: string | null
          funil_created_at: string | null
          funil_id: string | null
          funil_status: string | null
          venda_cliente: string | null
          venda_codigo: string | null
          venda_data: string | null
          venda_id: string | null
          venda_status: string | null
          venda_telefone: number | null
          venda_valor: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Março | FUNIL Bruno_id_fkey"
            columns: ["funil_id"]
            isOneToOne: true
            referencedRelation: "Março | Cadastro Bruno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Março | FUNIL Bruno_id_fkey"
            columns: ["funil_id"]
            isOneToOne: true
            referencedRelation: "Selecao_Combinada_View"
            referencedColumns: ["cadastro_id"]
          },
        ]
      }
    }
    Functions: {
      airtable_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      airtable_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      airtable_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      auth0_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      auth0_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      auth0_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      big_query_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      big_query_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      big_query_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      click_house_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      click_house_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      click_house_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      cognito_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      cognito_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      cognito_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      firebase_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      firebase_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      firebase_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      hello_world_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      hello_world_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      hello_world_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      logflare_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      logflare_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      logflare_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      mssql_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      mssql_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      mssql_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      redis_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      redis_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      redis_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      s3_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      s3_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      s3_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      stripe_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      stripe_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      stripe_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      sync_selecao_to_bigquery: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sync_vendas_to_bigquery: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      wasm_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      wasm_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      wasm_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "dev" | "admin" | "vendedor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["dev", "admin", "vendedor"],
    },
  },
} as const
