export default function() {
  this.transition(
    this.fromRoute('anon.login'),
    this.toRoute('anon.register'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('anon.login'),
    this.toRoute('anon.forgot-password'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('anon.login'),
    this.toRoute('dashboard'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  //   this.transition(
  //     this.fromRoute('people.index'),
  //     this.toRoute('people.detail'),
  //     this.use('toLeft'),
  //     this.reverse('toRight')
  //   );
}
