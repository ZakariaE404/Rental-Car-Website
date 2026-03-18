import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Politique de Confidentialité</h1>
                        <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Collecte des informations</h2>
                            <p>
                                Nous recueillons des informations lorsque vous effectuez une réservation sur notre site, vous vous connectez à votre compte, participez à un concours, et / ou lorsque vous vous déconnectez. Les informations recueillies incluent votre nom, votre adresse e-mail, numéro de téléphone, et / ou carte de crédit.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Utilisation des informations</h2>
                            <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                                <li>Fournir un contenu publicitaire personnalisé</li>
                                <li>Améliorer notre site Web</li>
                                <li>Améliorer le service client et vos besoins de prise en charge</li>
                                <li>Vous contacter par e-mail ou téléphone</li>
                                <li>Traiter les transactions</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Confidentialité du commerce en ligne</h2>
                            <p>
                                Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Divulgation à des tiers</h2>
                            <p>
                                Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Protection des informations</h2>
                            <p>
                                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nos ordinateurs et serveurs utilisés pour stocker des informations personnelles identifiables sont conservés dans un environnement sécurisé.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Consentement</h2>
                            <p>
                                En utilisant notre site, vous consentez à notre politique de confidentialité en ligne.
                            </p>
                        </section>

                        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm">
                            <p className="font-bold text-slate-900 mb-2">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
                            <p>Pour toute question concernant cette politique, veuillez nous contacter via notre page de contact.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
