import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Conditions Générales</h1>
                        <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Conditions de location</h2>
                            <p>
                                Pour louer un véhicule, le locataire principal doit être âgé d'au moins 21 ans et être titulaire d'un permis de conduire valide depuis au moins un an. Des frais supplémentaires peuvent s'appliquer pour les jeunes conducteurs. Le locataire doit également présenter une carte de crédit valide à son nom.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Réservation et paiement</h2>
                            <p>
                                Les réservations peuvent être faites en ligne ou par téléphone. Un acompte peut être exigé pour garantir la réservation. Le solde est payable au moment de la prise en charge du véhicule. Nous acceptons les cartes de crédit, les virements bancaires et les paiements en espèces (selon les conditions).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Utilisation du véhicule</h2>
                            <p>
                                Le véhicule loué ne peut être conduit que par le locataire principal et les conducteurs additionnels autorisés figurant sur le contrat de location. Il est interdit d'utiliser le véhicule pour le transport de passagers à titre onéreux, pour pousser ou tirer un autre véhicule, ou pour participer à des courses ou des rallyes automobiles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Assurance et franchises</h2>
                            <p>
                                Nos véhicules sont couverts par une assurance responsabilité civile aux tiers. En cas de dommages causés au véhicule, le locataire est responsable jusqu'à concurrence de la franchise indiquée au contrat, sauf si une assurance rachat de franchise a été souscrite. Note: l'assurance ne couvre pas les dommages causés aux pneus, au bris de glace, ou si le conducteur est sous l'emprise de l'alcool ou de drogues.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Restitution du véhicule</h2>
                            <p>
                                Le véhicule doit être restitué à la date et à l'heure convenues, dans le même état que lors de la prise en charge, avec le même niveau de carburant. Des frais de retard seront facturés si le véhicule n'est pas rendu à temps.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Annulation et modification</h2>
                            <p>
                                Toute annulation ou modification de la réservation doit être communiquée au moins 48 heures avant le début de la location. Des frais d'annulation peuvent s'appliquer selon les conditions tarifaires choisies.
                            </p>
                        </section>

                        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm">
                            <p className="font-bold text-slate-900 mb-2">Date d'entrée en vigueur : {new Date().toLocaleDateString('fr-FR')}</p>
                            <p>Ces conditions peuvent être modifiées à tout moment. Il vous appartient de les consulter régulièrement.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
