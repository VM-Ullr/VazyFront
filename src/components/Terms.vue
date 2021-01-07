<template>
  <span class="terms">
    <span @click='showModal' class="link">Terms of Service</span>

    <b-modal ref="modal-1" title="Terms of Service" hide-footer size="xl">
      <h4>Introduction</h4>
      <p>Dans le cadre de son activité, la société VAZY.fun, dont le siège social est situé au 20 Avenue Albert Einstein 69100 Villeurbanne, est amenée à collecter et à traiter des informations dont certaines sont qualifiées de "données personnelles". VAZY.fun attache une grande importance au respect de la vie privée, et n’utilise que des donnes de manière responsable et confidentielle et dans une finalité précise.</p>
      <h4>Données personnelles</h4>
      <p>Sur le site web VAZY.fun, il n’y a 2 qu’un type de données susceptibles d’être recueillies. Ce sont les données transmises directement. Ces données sont celles que vous nous transmettez directement, via le formulaire d’inscription. Sont obligatoires dans le formulaire de contact le champs « email », « username », « email », « nom & prénom », « date de naissance » et « adresse ». D’autres données sont recueillies par la suite et concerne la réponse aux sondages.
      <br/>
      En aucun VAZY.fun ne collecte des données automatiquement (web analytics, durée de consultation, adresse IP, type et version de navigateur...) </p>
      <h4>Utilisation des données</h4>
      <p>Les données que vous nous transmettez directement sont utilisées dans le but direct de l'utilisation du site. En aucun cas ces données seront réutilisées afin de vous contacter directement.
      <br/>
      Ces données sont stockées au départ en clair en local de manière fortement sécurisée et surveillée par nos soins pendant la durée de stockage. Les résultats sont ensuite anonymisés et accessibles aux employés concernés de VAZY.fun en vu de l’exploitation des données dans le cadre prévu ci-dessus. Ces données sont conservées pendant la durée de conservation indiqué ci-dessous.
      <br/>
      Ces données sont utilisées par VAZY.fun, responsable du traitement des données, uniquement et ne seront jamais cédées à un tiers ni utilisées à d’autres fins que celles détaillées ci-dessus. </p>
      <h4>Base légale</h4>
      <p>Les données personnelles ne sont collectées qu’après consentement obligatoire de l’utilisateur. Ce consentement est valablement recueilli (boutons et cases à cocher), libre, clair et sans équivoque. </p>
      <h4>Durée de conservation</h4>
      <p>Les données seront sauvegardées durant une durée maximale de 1 an. </p>
      <h4>Cookies</h4>
      <p>VAZY.fun n’utilise aucun cookie. </p>
      <h4>Vos droits concernant les données personnelles</h4>
      <p>Vous avez le droit de consultation, demande de modification ou d’effacement sur l’ensemble de vos données personnelles. Vous pouvez également retirer votre consentement au traitement de vos données. </p>
      <h4>Contact délégué à la protection des données</h4>
      <p>Valentin Muller. <br/>
      Adresse e-mail : val.muller@vazy.fun <br/>
      Téléphone : (+33) 7 52 33 55 41</p>
    </b-modal>
  </span>
</template>

<script>
export default {
  name: 'Terms',
  methods: {
      showModal() {
        this.$refs['modal-1'].show()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link{
  cursor: pointer;
  text-decoration : underline;
}
</style>
