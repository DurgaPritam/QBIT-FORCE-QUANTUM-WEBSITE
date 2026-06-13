import { LegalDocument } from "../Components/LegalDocument";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";

function Privacy() {
  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Legal"
        title="Privacy Policy"
        intro="How Qbit Force collects, uses, and protects your personal information."
        chips={[
          { label: "Read policy", href: "#privacy-content" },
          { label: "Terms", href: "/terms" },
          { label: "Contact", href: "/contactus" },
        ]}
      />

      <PageContentSection id="privacy-content" maxWidth="max-w-3xl">
        <LegalDocument>
          <h3>Privacy Policy</h3>
          <p>
            QbitForceQuantum Pvt. Ltd. (Hereinafter referred to as "QbitForce," "we," "us," or "our")
            is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information
            when you visit our website [https://QbitForce.tech], use our services, or engage with us in any way.
            This Policy defines the minimum standards with respect to QbitForce collecting, processing, or otherwise using personal data, including information that may be considered as sensitive Personal Data ("Personal Data")
            about individuals including QbitForce associates, business contacts, customers or vendors ("Individuals").
          </p>
          <p>
            Where QbitForce will handle Personal Data in accordance with the following principles.
            QbitForce ensures that its business partners and vendors comply with the principles of this Policy and applicable legal and regulatory compliance standards through appropriate contractual agreements.
          </p>

          <h3>Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <p><strong>Personal Information:</strong> Information that identifies you personally, such as your name, email address, phone number, and company affiliation.</p>
          <p><strong>Usage Data:</strong> Information about how you use our website and services, including IP address, browser type, pages visited, and the time and date of visits.</p>
          <p><strong>Cookies and Tracking Technologies:</strong> We may use cookies, web beacons, and similar tracking technologies to enhance your experience on our website.</p>

          <h3>Lawfulness of Processing</h3>
          <p>
            QbitForce will collect, store, process, use, share, transfer, analyze or otherwise handle ("Process" or "Processing") Personal Data in accordance with applicable legal requirements
            for legitimate business or compliance purpose or if individuals have provided consent to the Processing or any relevant basis as defined by the applicable laws or regulations.
          </p>

          <h3>How We Use Your Information</h3>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>To provide, maintain, and improve our services.</li>
            <li>To communicate with you, including responding to inquiries and sending updates.</li>
            <li>To analyze usage and trends to enhance user experience.</li>
            <li>To comply with legal obligations and protect our rights.</li>
          </ul>

          <h3>Disclosure of Your Information</h3>
          <p>We may share your information in the following circumstances:</p>
          <p><strong>With Service Providers:</strong> We may employ third-party companies and individuals to facilitate our services, provide the service on our behalf, or assist us in analyzing how our services are used.</p>
          <p><strong>For Legal Reasons:</strong> We may disclose your information if required by law or public authorities.</p>
          <p><strong>For Lead Generation and Identity Enrichment:</strong> We collect your information from publicly or commercially available sources such as attendance at events we sponsor, searches on the public internet, and data enrichment services.
            This helps us communicate with you more effectively and find others who are interested in our products and services.
          </p>

          <h3>Transparency</h3>
          <p>
            In accordance with applicable legal requirements, QbitForce will provide information to individuals that explains the scope and purpose of Processing, and whom to contact to seek clarifications about privacy or data protection.
          </p>

          <h3>Data Security</h3>
          <p>
            We aim to protect the security and confidentiality of individuals' Personal Data and implement physical, technical and organizational measures against accidental, unlawful or unauthorized destruction, loss, alteration, disclosure or access.
            We will ensure measures are appropriate to the risks represented by the Processing it carries out and the nature of those Personal Data.
          </p>

          <h3>Data Breach Reporting</h3>
          <p>
            All known or suspected incidents involving Personal Data must be reported immediately upon discovery. This includes incidents notified to QbitForce by any QbitForce associate, client, third party service provider or other business partner.
            QbitForce will provide education and awareness to its workforce regarding the procedures for reporting a suspected or confirmed incident. Each incident is investigated and tracked to closure.
            If the investigation leads to the conclusion that an illegal, improper or unethical act has been committed, appropriate disciplinary or corrective action will be initiated against the offender under applicable laws.
          </p>

          <h3>Jurisdiction-Specific Requirements and Implementation</h3>
          <p>
            National data protection and privacy laws may impose additional requirements on QbitForce for the Processing of Personal Data. Where required, QbitForce will establish procedures and guidelines in order to supplement the principles of this Policy and engage with relevant regulatory/ supervisory authority, as required.
          </p>
          <p>To exercise these rights, contact us at info@qbitforcequantum.com</p>

          <h3>Third-Party Links</h3>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          <h3>Data Subject Rights</h3>
          <p>
            QbitForce will provide opportunity to exercise data subject rights, which may include access, correction, objection, etc.
          </p>

          <h3>International Data Transfers</h3>
          <p>
            QbitForce operates on a global level and from time to time it may be required to transfer Personal Data across countries. QbitForce recognizes that Personal Data needs to be treated with care, including data transfer to countries, which may not have adequate data protection laws.
            If QbitForce transfers Personal Data to such countries, it will protect these Personal Data as set out in this Policy and in accordance with the requirements of applicable law.
          </p>

          <h3>Data Retention</h3>
          <p>
            QbitForce will observe retention policies and procedures so that it deletes Personal Data after a reasonable time and the purposes are met. Exception applies if in the context of those purposes, it is necessary to keep the Personal Data indefinitely, or a law requires the Personal Data to be kept for a certain time.
            When QbitForce no longer needs to keep Personal Data for the purposes, for which they are held, it will delete them as soon as practicable.
          </p>

          <h3>Changes to This Privacy Policy</h3>
          <p>
            QbitForce may update this Policy from time to time and without prior notice to individuals to reflect changes in law or privacy practices. If you have questions about this Policy, please direct them to the contact details that can be referred from https://qbitforcequantum.com/privacypolicy.
          </p>

          <h3>Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p>
            Email: Info@qbitforcequantum.com<br />
            76-8-10/1C, Munnaluri,<br />
            Subbarayudu Street, Bhavanipuram,<br />
            Krishna, Vijayawada (Urban),<br />
            Andhra Pradesh, India<br />
          </p>
        </LegalDocument>
      </PageContentSection>
    </FramerPageShell>
  );
}

export default Privacy;
