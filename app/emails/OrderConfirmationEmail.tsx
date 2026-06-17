import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Hr,
  Text,
  Heading,
  Link,
} from "@react-email/components";

interface OrderEmailProps {
  orderId: string;
  orderRef: string;
  customerEmail: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  billingAddress?: string;
  shippingAddress?: string;
}

const COLORS = {
  bg: "#0b0604",
  card: "#170d08",
  cardSoft: "#241710",
  border: "#3a251b",
  gold: "#c9a35e",
  goldSoft: "#e2c894",
  text: "#f5efe6",
  muted: "#bcab9c",
  dim: "#8a7b70",
};

const FONT_BODY =
  "Helvetica, Arial, -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_HEADING = "Georgia, 'Times New Roman', Times, serif";

const money = (n: number) => `€ ${n.toFixed(2)}`;

export default function OrderConfirmationEmail({
  orderId,
  orderRef,
  customerEmail,
  total,
  subtotal,
  shipping,
  discount,
  items,
  billingAddress,
  shippingAddress,
}: OrderEmailProps) {
  return (
    <Html lang="it">
      <Head />
      <Preview>
        Ordine confermato — grazie per aver scelto Scaramuzzo Hair Natural Beauty
      </Preview>

      <Body
        style={{
          backgroundColor: COLORS.bg,
          margin: 0,
          padding: "24px 0",
          fontFamily: FONT_BODY,
          color: COLORS.text,
          WebkitTextSizeAdjust: "100%",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {/* BARRA ORO SUPERIORE */}
          <Section
            style={{
              height: "4px",
              backgroundColor: COLORS.gold,
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              fontSize: "1px",
              lineHeight: "4px",
            }}
          >
            <Text style={{ margin: 0, fontSize: "1px", lineHeight: "4px" }}>
              &nbsp;
            </Text>
          </Section>

          {/* CARD PRINCIPALE */}
          <Section
            style={{
              backgroundColor: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderTop: "none",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              padding: "40px 32px",
            }}
          >
            {/* LOGO + BRAND */}
            <Section style={{ textAlign: "center", paddingBottom: "8px" }}>
              <Img
                src="https://www.scaramuzzo.green/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp"
                alt="Scaramuzzo Hair Natural Beauty"
                width="120"
                style={{ margin: "0 auto", display: "block" }}
              />
              <Text
                style={{
                  margin: "12px 0 0 0",
                  fontFamily: FONT_HEADING,
                  fontSize: "13px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: COLORS.gold,
                }}
              >
                Hair Natural Beauty
              </Text>
            </Section>

            {/* TITOLO */}
            <Section style={{ textAlign: "center", padding: "24px 0 8px 0" }}>
              <Heading
                as="h1"
                style={{
                  margin: 0,
                  fontFamily: FONT_HEADING,
                  fontSize: "28px",
                  fontWeight: "normal",
                  color: COLORS.text,
                }}
              >
                Ordine confermato
              </Heading>
              <Text
                style={{
                  margin: "12px 0 0 0",
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: COLORS.muted,
                }}
              >
                Grazie per aver scelto Scaramuzzo Hair Natural Beauty.
                <br />
                Il nostro team prenderà in carico il tuo ordine.
              </Text>
            </Section>

            {/* META ORDINE */}
            <Section
              style={{
                backgroundColor: COLORS.cardSoft,
                borderRadius: "12px",
                padding: "18px 20px",
                margin: "24px 0 8px 0",
              }}
            >
              <Row>
                <Column style={{ width: "50%", verticalAlign: "top" }}>
                  <Text style={metaLabel}>Riferimento ordine</Text>
                  <Text style={metaValue}>{orderRef}</Text>
                </Column>
                <Column style={{ width: "50%", verticalAlign: "top" }}>
                  <Text style={metaLabel}>Email cliente</Text>
                  <Text style={{ ...metaValue, wordBreak: "break-all" }}>
                    {customerEmail}
                  </Text>
                </Column>
              </Row>
              <Text
                style={{
                  margin: "12px 0 0 0",
                  fontSize: "11px",
                  color: COLORS.dim,
                  wordBreak: "break-all",
                }}
              >
                ID Stripe: {orderId}
              </Text>
            </Section>

            {(shippingAddress || billingAddress) && (
              <Section
                style={{
                  backgroundColor: COLORS.cardSoft,
                  borderRadius: "12px",
                  padding: "18px 20px",
                  margin: "16px 0 0 0",
                }}
              >
                {shippingAddress && (
                  <>
                    <Text style={metaLabel}>Indirizzo spedizione</Text>
                    <Text
                      style={{
                        ...metaValue,
                        fontWeight: "normal",
                        whiteSpace: "pre-line",
                        marginBottom: billingAddress ? "12px" : 0,
                      }}
                    >
                      {shippingAddress}
                    </Text>
                  </>
                )}
                {billingAddress && (
                  <>
                    <Text style={metaLabel}>Indirizzo fatturazione</Text>
                    <Text
                      style={{
                        ...metaValue,
                        fontWeight: "normal",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {billingAddress}
                    </Text>
                  </>
                )}
              </Section>
            )}

            {/* PRODOTTI */}
            <Section style={{ padding: "16px 0 0 0" }}>
              <Text
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: COLORS.gold,
                }}
              >
                Riepilogo prodotti
              </Text>

              <Hr style={{ borderColor: COLORS.border, margin: "12px 0" }} />

              {items.map((item) => (
                <Row key={item.id} style={{ marginBottom: "8px" }}>
                  <Column style={{ width: "72px", verticalAlign: "top" }}>
                    <Img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      height="60"
                      style={{
                        display: "block",
                        objectFit: "contain",
                        backgroundColor: COLORS.cardSoft,
                        padding: "6px",
                        borderRadius: "10px",
                        border: `1px solid ${COLORS.border}`,
                      }}
                    />
                  </Column>

                  <Column style={{ verticalAlign: "top", paddingLeft: "14px" }}>
                    <Text
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: COLORS.text,
                        lineHeight: "20px",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        margin: "4px 0 0 0",
                        fontSize: "13px",
                        color: COLORS.muted,
                      }}
                    >
                      Quantità: {item.quantity} &middot; {money(item.price)} cad.
                    </Text>
                  </Column>

                  <Column
                    style={{
                      verticalAlign: "top",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Text
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: COLORS.text,
                      }}
                    >
                      {money(item.price * item.quantity)}
                    </Text>
                  </Column>
                </Row>
              ))}

              <Hr style={{ borderColor: COLORS.border, margin: "16px 0" }} />

              <Row style={{ marginBottom: "6px" }}>
                <Column>
                  <Text style={summaryLabel}>Subtotale prodotti</Text>
                </Column>
                <Column style={{ textAlign: "right" }}>
                  <Text style={summaryValue}>{money(subtotal)}</Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: "6px" }}>
                <Column>
                  <Text style={summaryLabel}>Spedizione</Text>
                </Column>
                <Column style={{ textAlign: "right" }}>
                  <Text style={summaryValue}>
                    {shipping <= 0 ? "Gratuita" : money(shipping)}
                  </Text>
                </Column>
              </Row>

              {discount > 0 && (
                <Row style={{ marginBottom: "6px" }}>
                  <Column>
                    <Text style={summaryLabel}>Sconto</Text>
                  </Column>
                  <Column style={{ textAlign: "right" }}>
                    <Text style={{ ...summaryValue, color: COLORS.goldSoft }}>
                      −{money(discount)}
                    </Text>
                  </Column>
                </Row>
              )}

              <Hr style={{ borderColor: COLORS.border, margin: "12px 0 16px 0" }} />

              {/* TOTALE PAGATO */}
              <Row>
                <Column style={{ textAlign: "left", verticalAlign: "middle" }}>
                  <Text
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: COLORS.muted,
                    }}
                  >
                    Totale pagato
                  </Text>
                </Column>
                <Column style={{ textAlign: "right", verticalAlign: "middle" }}>
                  <Text
                    style={{
                      margin: 0,
                      fontFamily: FONT_HEADING,
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: COLORS.goldSoft,
                    }}
                  >
                    {money(total)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* SPEDIZIONE / ASSISTENZA */}
            <Section
              style={{
                backgroundColor: COLORS.cardSoft,
                borderRadius: "12px",
                padding: "18px 20px",
                margin: "28px 0 0 0",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: COLORS.muted,
                }}
              >
                Riceverai un&rsquo;ulteriore email con il tracking non appena il
                tuo ordine verrà spedito. Per qualsiasi necessità puoi
                rispondere a questa email o scriverci a{" "}
                <Link
                  href="mailto:scaramuzzohnb@gmail.com"
                  style={{ color: COLORS.goldSoft, textDecoration: "underline" }}
                >
                  scaramuzzohnb@gmail.com
                </Link>
                .
              </Text>
            </Section>

            {/* LINK SITO */}
            <Section style={{ textAlign: "center", padding: "28px 0 4px 0" }}>
              <Link
                href="https://www.scaramuzzo.green"
                style={{
                  display: "inline-block",
                  backgroundColor: COLORS.gold,
                  color: COLORS.bg,
                  fontSize: "14px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  padding: "12px 28px",
                  borderRadius: "999px",
                }}
              >
                Visita il sito
              </Link>
            </Section>
          </Section>

          {/* FOOTER */}
          <Section style={{ textAlign: "center", padding: "24px 8px 8px 8px" }}>
            <Text
              style={{
                margin: 0,
                fontSize: "12px",
                lineHeight: "20px",
                color: COLORS.dim,
              }}
            >
              Scaramuzzo Hair Natural Beauty
              <br />
              Via Nazionale 70, Corigliano-Rossano
              <br />
              © {new Date().getFullYear()} Tutti i diritti riservati
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const metaLabel: React.CSSProperties = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#8a7b70",
};

const metaValue: React.CSSProperties = {
  margin: "4px 0 0 0",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#f5efe6",
};

const summaryLabel: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "#bcab9c",
};

const summaryValue: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  fontWeight: "bold",
  color: "#f5efe6",
};
