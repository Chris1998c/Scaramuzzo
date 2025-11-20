import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Hr,
  Text,
} from "@react-email/components";

interface OrderEmailProps {
  orderId: string;
  customerEmail: string;
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

export default function OrderConfirmationEmail({
  orderId,
  customerEmail,
  total,
  items,
}: OrderEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Il tuo ordine è stato confermato — Scaramuzzo Hair Natural Beauty
      </Preview>

      <Body
        style={{
          backgroundColor: "#0e0705",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "40px 20px",
          }}
        >
          {/* LOGO */}
          <Img
            src="https://www.scaramuzzo.green/scaramuzzo-hair-natural-beauty-video-01-immagine-sovrapposta-removebg-preview.webp"
            alt="Scaramuzzo Logo"
            width="130"
            style={{
              margin: "0 auto",
              display: "block",
              marginBottom: "35px",
            }}
          />

          {/* TITOLO */}
          <Section style={{ textAlign: "center", marginBottom: "30px" }}>
            <Text
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                margin: "0 0 10px 0",
              }}
            >
              Grazie per il tuo ordine
            </Text>

            <Text
              style={{
                fontSize: "16px",
                color: "#d2c5b2",
                margin: 0,
              }}
            >
              La transazione è andata a buon fine.
            </Text>

            <Text
              style={{
                fontSize: "14px",
                color: "#c7b9ac",
                marginTop: "10px",
              }}
            >
              Ricevuta a: <strong>{customerEmail}</strong>
            </Text>
          </Section>

          {/* RIQUADRO DETTAGLI */}
          <Section
            style={{
              background: "#1b0d08",
              padding: "30px 22px",
              borderRadius: "14px",
              border: "1px solid #3a251b",
              marginBottom: "35px",
            }}
          >
            {/* Order ID */}
            <Text
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              Dettagli ordine
            </Text>

            <Text
              style={{
                fontSize: "14px",
                color: "#c9b8a5",
                marginBottom: "10px",
              }}
            >
              Numero ordine:{" "}
              <strong style={{ color: "white" }}>{orderId}</strong>
            </Text>

            <Hr style={{ borderColor: "#3a251b", margin: "20px 0" }} />

            {/* ITEMS */}
            {items.map((item) => (
              <Section key={item.id} style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", gap: "14px" }}>
                  {/* Image */}
                  <Img
                    src={item.image}
                    alt={item.name}
                    width="72"
                    height="72"
                    style={{
                      objectFit: "contain",
                      background: "#2a160c",
                      padding: "6px",
                      borderRadius: "10px",
                    }}
                  />

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        margin: "0 0 3px 0",
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text style={{ fontSize: "14px", color: "#c4b6ac" }}>
                      Quantità: {item.quantity}
                    </Text>

                    <Text style={{ fontSize: "14px", color: "#ffffff" }}>
                      € {(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </div>
                </div>
              </Section>
            ))}

            <Hr style={{ borderColor: "#3a251b", margin: "20px 0" }} />

            {/* TOTALE */}
            <Text
              style={{
                fontSize: "20px",
                fontWeight: "700",
                textAlign: "right",
                margin: 0,
              }}
            >
              Totale: € {total.toFixed(2)}
            </Text>
          </Section>

          {/* FOOTER */}
          <Text
            style={{
              fontSize: "14px",
              color: "#b8a89b",
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            Riceverai un’ulteriore email quando il tuo ordine verrà spedito.
          </Text>

          <Text
            style={{
              textAlign: "center",
              marginTop: "25px",
              fontSize: "12px",
              color: "#6a5c55",
              lineHeight: "20px",
            }}
          >
            Scaramuzzo Hair Natural Beauty  
            <br />
            Via Nazionale 70, Corigliano-Rossano  
            <br />
            © {new Date().getFullYear()} Tutti i diritti riservati
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
