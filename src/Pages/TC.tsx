import { LegalDocument } from "../Components/LegalDocument";
import FramerPageHero, { FramerPageShell, PageContentSection } from "../Components/FramerPageHero";

function TC() {
  return (
    <FramerPageShell>
      <FramerPageHero
        pillLabel="Legal"
        title="Terms and Conditions"
        intro="Terms governing your use of the Qbit Force Quantum website and services."
        chips={[
          { label: "Read terms", href: "#terms-content" },
          { label: "Privacy", href: "/privacypolicy" },
          { label: "Contact", href: "/contactus" },
        ]}
      />

      <PageContentSection id="terms-content" maxWidth="max-w-3xl">
        <LegalDocument>
          <h3>Introduction</h3>
          <p>
            Welcome to the official website of QbitForceQuantum Pvt. Ltd. (Hereinafter referred to as "QbitForce," "we," "us," or "our").  These Terms and Conditions ("Terms") govern your use of the website located at www.qbitforcequantum.com. By accessing or using this Website, you agree to comply with these Terms. If you do not agree to these Terms, please discontinue your use of the Website immediately.
          </p>
          <p>
            We reserve the right to modify these Terms at any time, and your continued use of the Website following any changes constitutes your acceptance of the modified Terms. Please review these Terms periodically to stay informed of any updates.
          </p>
          <h3>Use of the Website</h3>
          <h4>2.1 Eligibility</h4>
          <p>
            You must be at least 18 years of age to use this Website. By using the Website, you represent that you meet this requirement.
          </p>
          <h4>2.2 License to Use</h4>
          <p>
            We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Website strictly for personal and non-commercial purposes, subject to these Terms.
          </p>
          <h4>2.3 Prohibited Conduct</h4>
          <p>
            You agree not to use the Website for any unlawful or unauthorized purpose, including but not limited to:
          </p>
          <p>
            Breaching any applicable laws or regulations.<br />
            Engaging in any activity that interferes with the operation or security of the Website or that of other users.<br />
            Uploading or distributing viruses, malware, or any other harmful code.<br />
            Attempting to gain unauthorized access to any part of the Website or systems connected to the Website.<br />
            QbitForce reserves the right to terminate your access to the Website without notice if we deem that you have violated these Terms.<br />
          </p>

          <h3>Intellectual Property Rights</h3>
          <h4>3.1 Ownership of Content</h4>
          <p>
            All content on the Website, including but not limited to text, images, graphics, logos, software, and audio or video materials, is the property of QbitForce or its licensors and is protected by intellectual property laws. Unauthorized use of this content is strictly prohibited.
          </p>
          <h4>3.2 License Restrictions</h4>
          <p>
            You are prohibited from:<br />
            Copying, distributing, or transmitting any content from the Website without prior written consent from QbitForce.<br />
            Modifying, adapting, or creating derivative works based on any content from the Website.<br />
            Using the content for any commercial purpose without express authorization.<br />
          </p>

          <h3>Privacy and Data Protection</h3>
          <p>Our Privacy Policy governs the collection, use, and disclosure of personal information provided by you while using the Website. By accessing and using the Website, you consent to our collection and use of your information as outlined in the Privacy Policy.</p>

          <h3>5. Accuracy of Information</h3>
          <h4>5.1 General Information</h4>
          <p>The information provided on this Website is for general informational purposes only. While QbitForce makes every effort to ensure the accuracy and completeness of the content, we do not warrant that any information on the Website is free from errors or omissions.</p>
          <h4>5.2 Product and Service Information</h4>
          <p>We reserve the right to modify or discontinue any product or service listed on the Website without prior notice. Prices and availability are subject to change at any time.</p>

          <h3>6. Limitation of Liability</h3>
          <h4>6.1 No Warranties</h4>
          <p>This Website is provided on an "as-is" and "as-available" basis without any warranties of any kind, either expressed or implied. To the fullest extent permitted by law, QbitForce disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranty that the Website will be uninterrupted, error-free, or secure.</p>
          <h4>6.2 Limitation of Liability</h4>
          <p>In no event shall QbitForce or its affiliates, directors, officers, employees, or agents be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way related to your use of the Website or reliance on any information provided on the Website, even if advised of the possibility of such damages.</p>

          <h3>7. Indemnification</h3>
          <p>You agree to indemnify, defend, and hold harmless QbitForce and its affiliates, officers, directors, employees, and agents from and against any claims, damages, liabilities, costs, or expenses (including reasonable legal fees) arising out of your use of the Website, violation of these Terms, or infringement of any third-party rights.</p>

          <h3>8. Governing Law and Jurisdiction</h3>
          <p>These Terms and any disputes arising out of or in connection with them shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts of Amaravati, Andhra Pradesh, and you irrevocably submit to the jurisdiction of such courts.</p>

          <h3>9. Termination</h3>
          <p>QbitForce reserves the right to terminate your access to the Website, in its sole discretion, for any reason, including but not limited to your breach of these Terms. Upon termination, all rights granted to you under these Terms will immediately cease.</p>

          <h3>10. Changes to Terms and Conditions</h3>
          <p>QbitForce reserves the right to modify, update, or revise these Terms at any time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Website following the posting of changes constitutes your acceptance of those changes.</p>

          <h3>11. Contact Information</h3>
          <p>If you have any questions or concerns about these Terms, please contact us at:<br />
            QbitForceQuantum Pvt. Ltd.<br />
            Email: Info@qbitforcequantum.com<br />
            Address: QbitForceQuantum Pvt. Ltd.,<br />
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

export default TC;
